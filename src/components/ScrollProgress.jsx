import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setPct(Number.isFinite(scrolled) ? scrolled : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: '2px',
      width: pct + '%',
      background: 'linear-gradient(90deg,#8e6e22,#c8a24c,#e6c977)',
      zIndex: 110, transition: 'width .12s ease-out',
    }} />
  )
}
