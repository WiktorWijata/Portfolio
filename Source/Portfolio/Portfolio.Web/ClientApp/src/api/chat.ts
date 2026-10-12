import axios from 'axios'
import { LANGUAGE_STORAGE_KEY } from '@/context/PreferencesContext/PreferencesContext.consts'
import { readStorage } from '@/utils/storage'
import type { ChatRequest } from './models'
import { readServerSentEvents } from './sse'

const COMPLETION_ID_HEADER = 'Completion-Id'
const END_OF_STREAM = '[DONE]'
const ERROR_EVENT = 'error'
const STATUS_TOO_MANY_REQUESTS = 429

export const ChatErrorKind = {
  /** The visitor sent too many messages in a short time. */
  RateLimited: 'rateLimited',
  /** The assistant could not answer at all. */
  Unavailable: 'unavailable',
  /** The answer started and then broke off. */
  Interrupted: 'interrupted',
} as const
export type ChatErrorKind = (typeof ChatErrorKind)[keyof typeof ChatErrorKind]

export class ChatError extends Error {
  readonly kind: ChatErrorKind

  constructor(kind: ChatErrorKind, message: string) {
    super(message)
    this.name = 'ChatError'
    this.kind = kind
  }
}

export interface StreamChatAnswerOptions {
  prompt: string
  /** The conversation to continue; `null` starts a new one. */
  completionId: string | null
  signal?: AbortSignal
  /** Called with each piece of the answer as it arrives. */
  onToken: (token: string) => void
}

/**
 * Sends a message to the assistant and streams the answer to `onToken`. It returns the id of the conversation,
 * to be passed back to continue it. The API is reached the way the rest of the client reaches it (the axios base
 * URL), but with `fetch`, because axios cannot read a response while it is still being written. For the same reason
 * the generated `postChatCompletions` and its hooks are not used: they would wait for the whole answer. Only the
 * request type comes from the generated models.
 */
export async function streamChatAnswer({
  prompt,
  completionId,
  signal,
  onToken,
}: StreamChatAnswerOptions): Promise<string> {
  const path = completionId ? `/chat/completions/${encodeURIComponent(completionId)}` : '/chat/completions'

  const body: ChatRequest = { prompt }

  let response: Response
  try {
    response = await fetch(`${axios.defaults.baseURL ?? ''}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        'Accept-Language': readStorage(LANGUAGE_STORAGE_KEY) ?? 'pl',
      },
      body: JSON.stringify(body),
      signal,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new ChatError(ChatErrorKind.Unavailable, 'The assistant could not be reached.')
  }

  if (!response.ok || !response.body) {
    throw new ChatError(
      response.status === STATUS_TOO_MANY_REQUESTS ? ChatErrorKind.RateLimited : ChatErrorKind.Unavailable,
      `The assistant answered ${response.status}.`,
    )
  }

  const answeredId = response.headers.get(COMPLETION_ID_HEADER) ?? completionId
  let started = false

  try {
    for await (const event of readServerSentEvents(response.body)) {
      if (event.event === ERROR_EVENT) {
        throw new ChatError(ChatErrorKind.Interrupted, event.data)
      }
      if (event.data === END_OF_STREAM) break

      started = true
      onToken(event.data)
    }
  } catch (error) {
    if (error instanceof ChatError || signal?.aborted) throw error
    throw new ChatError(started ? ChatErrorKind.Interrupted : ChatErrorKind.Unavailable, 'The answer was cut off.')
  }

  if (!answeredId) throw new ChatError(ChatErrorKind.Unavailable, 'The assistant did not name the conversation.')
  return answeredId
}
