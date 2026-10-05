import { useEffect, useState } from 'react'

export function useScrollPosition() {
  const [y, setY] = useState(() => window.scrollY)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return y
}
