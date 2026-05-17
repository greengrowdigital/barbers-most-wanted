import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function Navbar() {
  const { t, lang, toggle } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const links = [
    { to: '/',         k: 'nav.home' },
    { to: '/services', k: 'nav.services' },
    { to: '/barbers',  k: 'nav.barbers' },
    { to: '/gallery',  k: 'nav.gallery' },
    { to: '/about',    k: 'nav.about' },
    { to: '/contact',  k: 'nav.contact' },
  ]

  return (
    <>
      {/* Top bar */}
      <div className="bg-black text-bone/80 py-2 px-4 text-center border-b border-bone/5 overflow-hidden">
        <div className="font-stencil text-[.55rem] sm:text-[.65rem] tracking-stencil whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="hidden sm:inline">{t('top.bar')}</span>
          <span className="sm:hidden">2786 Long Beach Rd · Oceanside NY</span>
          <span className="mx-3 text-brass opacity-40">·</span>
          <Link to="/booking" className="text-brass underline underline-offset-4 hover:text-brass-light">
            {t('top.cta')}
          </Link>
        </div>
      </div>

      {/* Pole stripe */}
      <div className="pole-stripe h-[3px]" />

      {/* Nav */}
      <header className={"sticky top-0 z-50 bg-ink/95 backdrop-blur-md border-b border-bone/5 transition-all duration-500 " + (scrolled ? 'py-1' : 'py-3')}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <span className="w-9 h-9 sm:w-10 sm:h-10 bg-blood flex items-center justify-center font-display text-bone text-lg sm:text-xl border-2 border-bone/20 group-hover:border-brass transition flex-shrink-0">B</span>
            <div className="leading-tight min-w-0">
              <div className="font-display text-bone text-sm sm:text-lg lg:text-xl tracking-wide truncate">BARBERS MOST WANTED</div>
              <div className="font-stencil text-[.55rem] sm:text-[.6rem] tracking-stencil text-fog truncate">{t('brand.tagline')}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              >
                {t(l.k)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={toggle}
              aria-label="Toggle language"
              className="font-condensed text-[.7rem] sm:text-[.75rem] tracking-stencil border border-bone/15 text-bone hover:border-brass hover:text-brass px-2.5 sm:px-3 py-2 transition"
            >
              <span className={lang === 'en' ? 'text-brass' : 'opacity-60'}>EN</span>
              <span className="mx-1 opacity-30">/</span>
              <span className={lang === 'es' ? 'text-brass' : 'opacity-60'}>ES</span>
            </button>

            <Link to="/booking" className="btn btn-brass btn-shine hidden md:inline-flex text-[.65rem] lg:text-[.7rem] px-4 py-3 lg:px-5">
              {t('nav.bookNow')}
            </Link>

            <button
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1 border border-bone/15 flex-shrink-0"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-5 h-px bg-bone"></span>
              <span className="w-5 h-px bg-bone"></span>
              <span className="w-5 h-px bg-bone"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div className={"mobile-sheet" + (open ? ' open' : '')}>
        <button
          className="absolute top-6 right-6 w-12 h-12 border border-brass/40 text-brass text-2xl flex items-center justify-center"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >×</button>
        <nav className="flex flex-col gap-4 mt-8">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}>{t(l.k)}</NavLink>
          ))}
          <NavLink to="/booking" className="text-brass">{t('nav.bookNow')}</NavLink>
        </nav>
        <div className="mt-auto border-t border-bone/10 pt-6">
          <div className="font-stencil text-[.65rem] tracking-stencil text-fog">2786 Long Beach Rd · Oceanside NY</div>
          <div className="font-stencil text-[.65rem] tracking-stencil text-fog mt-1">(516) 555-0142</div>
        </div>
      </div>
    </>
  )
}
