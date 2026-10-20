// @vitest-environment jsdom
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderMarkdown } from './renderMarkdown'

function html(source: string) {
  const { container } = render(<div>{renderMarkdown(source)}</div>)
  return container.firstElementChild as HTMLElement
}

describe('renderMarkdown', () => {
  it('shows plain text as it is', () => {
    expect(html('Hello there').innerHTML).toBe('<p>Hello there</p>')
  })

  it('makes **bold** text strong, without the asterisks', () => {
    const root = html('Zaplecze: **Zaplecze techniczne** i dalej')

    expect(root.querySelector('strong')?.textContent).toBe('Zaplecze techniczne')
    expect(root.textContent).toBe('Zaplecze: Zaplecze techniczne i dalej')
  })

  it('handles italics and inline code', () => {
    const root = html('*slanted* and `code`')

    expect(root.querySelector('em')?.textContent).toBe('slanted')
    expect(root.querySelector('code')?.textContent).toBe('code')
  })

  it('splits paragraphs at a blank line and keeps single line breaks', () => {
    const root = html('first\nsecond\n\nthird')

    const paragraphs = root.querySelectorAll('p')
    expect(paragraphs).toHaveLength(2)
    expect(paragraphs[0]!.textContent).toBe('first\nsecond')
    expect(paragraphs[1]!.textContent).toBe('third')
  })

  it('makes bullet lists, with - * or + as the marker', () => {
    const root = html('Skills:\n- C#\n* SQL\n+ Azure')

    expect(root.querySelector('p')?.textContent).toBe('Skills:')
    expect(Array.from(root.querySelectorAll('ul > li')).map((li) => li.textContent)).toEqual(['C#', 'SQL', 'Azure'])
  })

  it('makes numbered lists', () => {
    const root = html('1. one\n2. two\n3) three')

    expect(Array.from(root.querySelectorAll('ol > li')).map((li) => li.textContent)).toEqual(['one', 'two', 'three'])
  })

  it('keeps markup inside a list item', () => {
    const root = html('- **B3 Consulting** – .NET Developer')

    expect(root.querySelector('li strong')?.textContent).toBe('B3 Consulting')
  })

  it('starts a new paragraph after a list', () => {
    const root = html('- a\n- b\nThat is all.')

    expect(root.querySelectorAll('li')).toHaveLength(2)
    expect(root.querySelector('ul + p')?.textContent).toBe('That is all.')
  })

  it('shows a heading as a bold line', () => {
    const root = html('## Experience\ntext')

    expect(root.querySelector('p strong')?.textContent).toBe('Experience')
    expect(root.textContent).not.toContain('#')
  })

  it('links markdown links and bare addresses and opens them safely', () => {
    const root = html('See [the site](https://example.com/a) or https://example.org/b.')

    const links = Array.from(root.querySelectorAll('a'))
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['https://example.com/a', 'https://example.org/b'])
    expect(links[0]!.textContent).toBe('the site')
    expect(links.every((a) => a.target === '_blank' && a.rel === 'noopener noreferrer')).toBe(true)
    // The full stop that ends the sentence is not part of the address.
    expect(root.textContent?.endsWith('https://example.org/b.')).toBe(true)
  })

  it('does not make a link of an address with another protocol', () => {
    const root = html('[click](javascript:alert(1)) and [file](file:///etc/passwd)')

    expect(root.querySelector('a')).toBeNull()
    expect(root.textContent).toContain('click')
  })

  it('never turns markup in the text into elements', () => {
    const root = html('<img src=x onerror=alert(1)> <script>alert(1)</script>')

    expect(root.querySelector('img')).toBeNull()
    expect(root.querySelector('script')).toBeNull()
    expect(root.textContent).toContain('<img src=x')
  })

  it('shows an unfinished piece of markup as written until it is complete', () => {
    expect(html('**Zaplecze tech').textContent).toBe('**Zaplecze tech')
    expect(html('**Zaplecze tech').querySelector('strong')).toBeNull()
    expect(html('**Zaplecze tech**').querySelector('strong')?.textContent).toBe('Zaplecze tech')
  })

  it('gives an empty text nothing to show', () => {
    expect(html('').innerHTML).toBe('')
    expect(html('\n\n').innerHTML).toBe('')
  })
})
