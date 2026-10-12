import { describe, expect, it } from 'vitest'
import { readServerSentEvents, type ServerSentEvent } from './sse'

function streamOf(...chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk))
      controller.close()
    },
  })
}

async function read(...chunks: string[]): Promise<ServerSentEvent[]> {
  const events: ServerSentEvent[] = []
  for await (const event of readServerSentEvents(streamOf(...chunks))) events.push(event)
  return events
}

describe('readServerSentEvents', () => {
  it('reads one event per blank line', async () => {
    expect(await read('data: Hel\n\ndata: lo\n\ndata: [DONE]\n\n')).toEqual([
      { event: 'message', data: 'Hel' },
      { event: 'message', data: 'lo' },
      { event: 'message', data: '[DONE]' },
    ])
  })

  it('joins the data lines of one event with a line break', async () => {
    expect(await read('data: Intro:\ndata: - one\ndata: - two\n\n')).toEqual([
      { event: 'message', data: 'Intro:\n- one\n- two' },
    ])
  })

  it('keeps an empty data line and strips only one space after the colon', async () => {
    expect(await read('data:  indented\n\ndata:\n\ndata:no space\n\n')).toEqual([
      { event: 'message', data: ' indented' },
      { event: 'message', data: '' },
      { event: 'message', data: 'no space' },
    ])
  })

  it('reads the name of an event', async () => {
    expect(await read('event: error\ndata: The answer was interrupted.\n\n')).toEqual([
      { event: 'error', data: 'The answer was interrupted.' },
    ])
  })

  it('handles an event cut anywhere between chunks, including inside a character', async () => {
    const bytes = new TextEncoder().encode('data: zażółć\n\ndata: gęślą\n\n')
    const cut = 9 // in the middle of the two bytes of "ż"
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes.slice(0, cut))
        controller.enqueue(bytes.slice(cut))
        controller.close()
      },
    })

    const events: ServerSentEvent[] = []
    for await (const event of readServerSentEvents(stream)) events.push(event)

    expect(events.map((e) => e.data)).toEqual(['zażółć', 'gęślą'])
  })

  it('reads CRLF line endings', async () => {
    expect(await read('data: a\r\ndata: b\r\n\r\ndata: c\r\n\r\n')).toEqual([
      { event: 'message', data: 'a\nb' },
      { event: 'message', data: 'c' },
    ])
  })

  it('skips comments and fields it does not know, and events without data', async () => {
    expect(await read(': keep-alive\n\nid: 7\nretry: 100\n\nevent: ping\n\nid: 8\ndata: text\n\n')).toEqual([
      { event: 'message', data: 'text' },
    ])
  })

  it('delivers the last event of a stream that ends without a blank line', async () => {
    expect(await read('data: one\n\ndata: two')).toEqual([
      { event: 'message', data: 'one' },
      { event: 'message', data: 'two' },
    ])
  })
})
