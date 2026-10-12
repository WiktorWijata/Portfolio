export interface ServerSentEvent {
  /** The `event:` name; `message` when the event does not name one. */
  event: string
  /** The `data:` lines joined with a line break, as the format defines. */
  data: string
}

const DEFAULT_EVENT = 'message'

/**
 * Reads a Server-Sent Events body and yields one event at a time, as it arrives. An event ends at a blank
 * line, so the chunks of the stream may cut it anywhere. Comments (`:`) and unknown fields are skipped.
 */
export async function* readServerSentEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<ServerSentEvent> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    for (;;) {
      const { done, value } = await reader.read()
      buffer += decoder.decode(value, { stream: !done })

      const blocks = buffer.split(/\r?\n\r?\n/)
      // The last block may be unfinished, unless the stream is over.
      buffer = done ? '' : (blocks.pop() ?? '')
      for (const block of blocks) {
        const event = parseEvent(block)
        if (event) yield event
      }

      if (done) return
    }
  } finally {
    reader.releaseLock()
  }
}

function parseEvent(block: string): ServerSentEvent | null {
  let event = DEFAULT_EVENT
  const data: string[] = []

  for (const line of block.split(/\r?\n/)) {
    if (line.startsWith('event:')) {
      event = stripLeadingSpace(line.slice('event:'.length))
    } else if (line.startsWith('data:')) {
      data.push(stripLeadingSpace(line.slice('data:'.length)))
    }
  }

  return data.length > 0 ? { event, data: data.join('\n') } : null
}

function stripLeadingSpace(value: string): string {
  return value.startsWith(' ') ? value.slice(1) : value
}
