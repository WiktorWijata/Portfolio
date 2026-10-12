// @vitest-environment jsdom
import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ChatError, ChatErrorKind, streamChatAnswer } from './chat'

function sse(body: string, init: ResponseInit = {}): Response {
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream', 'Completion-Id': 'conversation-1', ...init.headers },
    ...init,
  })
}

describe('streamChatAnswer', () => {
  const fetchMock = vi.fn<typeof fetch>()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
    axios.defaults.baseURL = '/api'
  })

  afterEach(() => {
    fetchMock.mockReset()
    vi.unstubAllGlobals()
    axios.defaults.baseURL = undefined
    localStorage.clear()
  })

  async function answer(completionId: string | null = null) {
    const tokens: string[] = []
    const id = await streamChatAnswer({ prompt: 'hello', completionId, onToken: (token) => tokens.push(token) })
    return { id, tokens }
  }

  it('starts a conversation and streams the pieces of the answer', async () => {
    fetchMock.mockResolvedValue(sse('data: Hel\n\ndata: lo\n\ndata: [DONE]\n\n'))

    const { id, tokens } = await answer()

    expect(tokens).toEqual(['Hel', 'lo'])
    expect(id).toBe('conversation-1')
    const [url, init] = fetchMock.mock.calls[0]!
    expect(url).toBe('/api/chat/completions')
    expect(init?.method).toBe('POST')
    expect(JSON.parse(init?.body as string)).toEqual({ prompt: 'hello' })
  })

  it('continues a conversation under its id and sends the language of the page', async () => {
    localStorage.setItem('portfolio.language', 'en')
    fetchMock.mockResolvedValue(sse('data: more\n\ndata: [DONE]\n\n', { headers: {} }))

    await answer('conversation-1')

    const [url, init] = fetchMock.mock.calls[0]!
    expect(url).toBe('/api/chat/completions/conversation-1')
    expect((init?.headers as Record<string, string>)['Accept-Language']).toBe('en')
  })

  it('keeps the line breaks of a piece that has several data lines', async () => {
    fetchMock.mockResolvedValue(sse('data: - one\ndata: - two\n\ndata: [DONE]\n\n'))

    expect((await answer()).tokens).toEqual(['- one\n- two'])
  })

  it('stops reading at the end marker', async () => {
    fetchMock.mockResolvedValue(sse('data: a\n\ndata: [DONE]\n\ndata: after\n\n'))

    expect((await answer()).tokens).toEqual(['a'])
  })

  it('reports too many messages', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 429 }))

    await expect(answer()).rejects.toMatchObject({ kind: ChatErrorKind.RateLimited })
  })

  it('reports an answer of the server that is not a success as unavailable', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }))

    await expect(answer()).rejects.toMatchObject({ kind: ChatErrorKind.Unavailable })
  })

  it('reports an unreachable server as unavailable', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))

    const error = await answer().catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ChatError)
    expect(error).toMatchObject({ kind: ChatErrorKind.Unavailable })
  })

  it('reports an answer that breaks off with an error event, after the pieces that came', async () => {
    fetchMock.mockResolvedValue(sse('data: Half an\n\nevent: error\ndata: The answer was interrupted.\n\n'))
    const tokens: string[] = []

    const error = await streamChatAnswer({
      prompt: 'hello',
      completionId: null,
      onToken: (token) => tokens.push(token),
    }).catch((e: unknown) => e)

    expect(tokens).toEqual(['Half an'])
    expect(error).toMatchObject({ kind: ChatErrorKind.Interrupted })
  })

  it('does not wrap an abort, so the caller can tell it from a failure', async () => {
    const controller = new AbortController()
    controller.abort()
    fetchMock.mockRejectedValue(new DOMException('Aborted', 'AbortError'))

    const error = await streamChatAnswer({
      prompt: 'hello',
      completionId: null,
      signal: controller.signal,
      onToken: () => undefined,
    }).catch((e: unknown) => e)

    expect(error).not.toBeInstanceOf(ChatError)
  })
})
