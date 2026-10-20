// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ChatError, ChatErrorKind, type StreamChatAnswerOptions } from '@/api'
import { ASSISTANT_KEYS } from '../../Assistant.keys'
import { ASSISTANT_PENDING_TEXT } from '../../Assistant.consts'
import { useAssistant } from './useAssistant'

const streamChatAnswer = vi.fn<(options: StreamChatAnswerOptions) => Promise<string>>()

vi.mock('@/api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/api')>()),
  streamChatAnswer: (options: StreamChatAnswerOptions) => streamChatAnswer(options),
}))
vi.mock('@/context', () => ({
  useEditor: () => ({ openPage: vi.fn() }),
  usePanels: () => ({ setChatOpen: vi.fn() }),
}))
// Without an initialized i18n the key itself is the text, which is all these tests need.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'pl' } }),
}))

function contents(messages: { content: unknown }[]) {
  return messages.map((message) => message.content)
}

describe('useAssistant', () => {
  beforeEach(() => {
    streamChatAnswer.mockReset()
  })

  it('starts with the welcome message only', () => {
    const { result } = renderHook(() => useAssistant())

    expect(contents(result.current.messages)).toEqual([ASSISTANT_KEYS.welcome])
  })

  it('shows the question with a pending answer, then fills the answer in as it streams', async () => {
    let finish!: (id: string) => void
    streamChatAnswer.mockImplementation(({ onToken }) => {
      onToken('Hel')
      onToken('lo')
      return new Promise<string>((resolve) => (finish = resolve))
    })
    const { result } = renderHook(() => useAssistant())

    act(() => result.current.send('hi'))

    await waitFor(() => expect(contents(result.current.messages).at(-1)).toBe('Hello'))
    expect(contents(result.current.messages)).toEqual([ASSISTANT_KEYS.welcome, 'hi', 'Hello'])
    finish('conversation-1')
  })

  it('shows the pending text until the first piece arrives', async () => {
    streamChatAnswer.mockReturnValue(new Promise(() => undefined))
    const { result } = renderHook(() => useAssistant())

    act(() => result.current.send('hi'))

    await waitFor(() => expect(contents(result.current.messages).at(-1)).toBe(ASSISTANT_PENDING_TEXT))
  })

  it('starts a conversation and then continues it under the id the first answer opened', async () => {
    streamChatAnswer.mockResolvedValue('conversation-1')
    const { result } = renderHook(() => useAssistant())

    act(() => result.current.send('first'))
    await waitFor(() => expect(streamChatAnswer).toHaveBeenCalledTimes(1))
    act(() => result.current.send('second'))
    await waitFor(() => expect(streamChatAnswer).toHaveBeenCalledTimes(2))

    expect(streamChatAnswer.mock.calls[0]![0]).toMatchObject({ prompt: 'first', completionId: null })
    expect(streamChatAnswer.mock.calls[1]![0]).toMatchObject({ prompt: 'second', completionId: 'conversation-1' })
  })

  it('sends a message typed while an answer is still being written only after that answer', async () => {
    let finishFirst!: (id: string) => void
    streamChatAnswer.mockImplementationOnce(() => new Promise<string>((resolve) => (finishFirst = resolve)))
    streamChatAnswer.mockResolvedValueOnce('conversation-1')
    const { result } = renderHook(() => useAssistant())

    act(() => result.current.send('first'))
    act(() => result.current.send('second'))
    await waitFor(() => expect(streamChatAnswer).toHaveBeenCalledTimes(1))
    expect(contents(result.current.messages)).toEqual([
      ASSISTANT_KEYS.welcome,
      'first',
      ASSISTANT_PENDING_TEXT,
      'second',
      ASSISTANT_PENDING_TEXT,
    ])

    finishFirst('conversation-1')
    await waitFor(() => expect(streamChatAnswer).toHaveBeenCalledTimes(2))
    expect(streamChatAnswer.mock.calls[1]![0]).toMatchObject({ prompt: 'second', completionId: 'conversation-1' })
  })

  it('replaces the pending answer with the error text when the assistant fails', async () => {
    streamChatAnswer.mockRejectedValue(new ChatError(ChatErrorKind.RateLimited, 'too many'))
    const { result } = renderHook(() => useAssistant())

    act(() => result.current.send('hi'))

    await waitFor(() => expect(contents(result.current.messages).at(-1)).toBe(ASSISTANT_KEYS.errors.rateLimited))
  })

  it('treats a failure that is not a chat error as the assistant being unavailable', async () => {
    streamChatAnswer.mockRejectedValue(new Error('boom'))
    const { result } = renderHook(() => useAssistant())

    act(() => result.current.send('hi'))

    await waitFor(() => expect(contents(result.current.messages).at(-1)).toBe(ASSISTANT_KEYS.errors.unavailable))
  })

  it('keeps what an interrupted answer already said and adds the note', async () => {
    streamChatAnswer.mockImplementation(({ onToken }) => {
      onToken('Half an')
      return Promise.reject(new ChatError(ChatErrorKind.Interrupted, 'cut'))
    })
    const { result } = renderHook(() => useAssistant())

    act(() => result.current.send('hi'))

    await waitFor(() =>
      expect(contents(result.current.messages).at(-1)).toBe(`Half an\n\n${ASSISTANT_KEYS.errors.interrupted}`),
    )
  })

  it('starts a new conversation after a failure, because the old one may be gone', async () => {
    streamChatAnswer.mockResolvedValueOnce('conversation-1')
    streamChatAnswer.mockRejectedValueOnce(new ChatError(ChatErrorKind.Unavailable, 'down'))
    streamChatAnswer.mockResolvedValueOnce('conversation-2')
    const { result } = renderHook(() => useAssistant())

    act(() => result.current.send('one'))
    await waitFor(() => expect(streamChatAnswer).toHaveBeenCalledTimes(1))
    act(() => result.current.send('two'))
    await waitFor(() => expect(contents(result.current.messages).at(-1)).toBe(ASSISTANT_KEYS.errors.unavailable))
    act(() => result.current.send('three'))
    await waitFor(() => expect(streamChatAnswer).toHaveBeenCalledTimes(3))

    expect(streamChatAnswer.mock.calls[2]![0]).toMatchObject({ prompt: 'three', completionId: null })
  })
})
