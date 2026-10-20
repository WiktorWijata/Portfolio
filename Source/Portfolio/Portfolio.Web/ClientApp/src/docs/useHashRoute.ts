import { useEffect, useState } from 'react'

function read() {
  return window.location.hash.replace(/^#/, '') || '/'
}

/** Minimal hash router: `#/components/button` → `/components/button`. */
export function useHashRoute() {
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const onChange = () => {
      setRoute(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export function navigate(path: string) {
  window.location.hash = path
}
