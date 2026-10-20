import { describe, expect, it } from 'vitest'
import { toGallerySlides } from './ProjectDetail.helpers'

const placeholderAlt = (number: number) => `placeholder ${number}`

describe('toGallerySlides', () => {
  it('turns the images into slides with their address and alternative text', () => {
    const slides = toGallerySlides(
      [
        { url: 'https://files.example/a.webp', alt: 'First' },
        { url: 'https://files.example/b.webp', alt: 'Second' },
      ],
      3,
      placeholderAlt,
    )

    expect(slides).toEqual([
      { src: 'https://files.example/a.webp', alt: 'First' },
      { src: 'https://files.example/b.webp', alt: 'Second' },
    ])
  })

  it('names an image without a text after its place in the gallery', () => {
    const slides = toGallerySlides(
      [{ url: 'https://files.example/a.webp' }, { url: 'https://files.example/b.webp' }],
      3,
      placeholderAlt,
    )

    expect(slides.map((slide) => slide.alt)).toEqual(['placeholder 1', 'placeholder 2'])
  })

  it('skips an image that has no address', () => {
    const slides = toGallerySlides(
      [{ alt: 'No address' }, { url: 'https://files.example/b.webp', alt: 'Second' }],
      3,
      placeholderAlt,
    )

    expect(slides).toEqual([{ src: 'https://files.example/b.webp', alt: 'Second' }])
  })

  it('gives empty slides, to be shown as places for a photo, when the project has no images yet', () => {
    expect(toGallerySlides([], 3, placeholderAlt)).toEqual([
      { alt: 'placeholder 1' },
      { alt: 'placeholder 2' },
      { alt: 'placeholder 3' },
    ])
  })
})
