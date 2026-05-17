import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="bg-black border-t border-bone/10 mt-24">
      <div className="pole-stripe h-[3px]" />
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-blood flex items-center justify-center font-display text-bone text-xl">B</span>
            <div>
              <div className="font-display text-bone text-xl">BARBERS MOST WANTED</div>
              <div className="font-stencil text-[.6rem] tracking-stencil text-fog">{t('brand.tagline')}</div>
            </div>
          </div>
          <p className="text-fog text-sm mt-5 leading-relaxed max-w-xs">{t('footer.blurb')}</p>
          <Link to="/booking" className="btn btn-brass btn-shine mt-6 text-[.7rem]">
            {t('footer.bookCTA')}
          </Link>
        </div>

        <div className="md:col-span-3">
          <div className="chrome-rule left mb-4">{t('footer.visit')}</div>
          <div className="text-bone text-sm">2786 Long Beach Rd</div>
          <div className="text-bone text-sm">Oceanside, NY 11572</div>
          <div className="text-fog text-xs mt-2">(516) 555-0142</div>
          <div className="text-fog text-xs">hello@barbersmostwanted.com</div>
        </div>

        <div className="md:col-span-3">
          <div className="chrome-rule left mb-4">{t('footer.hours')}</div>
          <ul className="text-fog text-xs space-y-1 font-mono">
            {t('contact.hours').map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="chrome-rule left mb-4">{t('footer.navigate')}</div>
          <ul className="space-y-2 text-bone text-sm">
            <li><Link to="/services" className="hover:text-brass">{t('nav.services')}</Link></li>
            <li><Link to="/barbers"  className="hover:text-brass">{t('nav.barbers')}</Link></li>
            <li><Link to="/gallery"  className="hover:text-brass">{t('nav.gallery')}</Link></li>
            <li><Link to="/about"    className="hover:text-brass">{t('nav.about')}</Link></li>
            <li><Link to="/contact"  className="hover:text-brass">{t('nav.contact')}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bone/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-stencil text-[.6rem] tracking-stencil text-fog">
            © {year} · Barbers Most Wanted · {t('footer.rights')}
          </div>
          <div className="font-stencil text-[.6rem] tracking-stencil text-fog">{t('footer.built')}</div>
        </div>
      </div>
    </footer>
  )
}
