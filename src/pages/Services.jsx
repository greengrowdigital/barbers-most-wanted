import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { SERVICES } from '../data/services.js'

export default function Services() {
  const { t } = useI18n()
  const [cat, setCat] = useState('all')

  const cats = [
    { id: 'all', k: 'services.categories.all' },
    { id: 'hair', k: 'services.categories.hair' },
    { id: 'beard', k: 'services.categories.beard' },
    { id: 'shave', k: 'services.categories.shave' },
    { id: 'kids', k: 'services.categories.kids' },
    { id: 'combo', k: 'services.categories.combo' },
  ]

  const filtered = useMemo(() =>
    cat === 'all' ? SERVICES : SERVICES.filter(s => s.category === cat),
    [cat]
  )

  return (
    <PageWrap>
      {/* Header */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-ink grain overflow-hidden">
        <div className="spot -top-40 right-0" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-stencil text-[.7rem] tracking-stencil text-brass mb-5">✦ {t('services.eyebrow')}</div>
          <h1 className="font-display text-bone" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', lineHeight: 0.9 }}>
            {t('services.title')}
          </h1>
          <p className="text-fog text-lg mt-6 max-w-2xl leading-relaxed">{t('services.subtitle')}</p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-graphite border-y border-bone/5 sticky top-[64px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-2 overflow-x-auto">
          {cats.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={
                'px-5 py-2.5 font-condensed text-[.72rem] tracking-stencil border transition ' +
                (cat === c.id
                  ? 'bg-brass border-brass text-ink'
                  : 'bg-transparent border-bone/15 text-bone hover:border-brass hover:text-brass')
              }
            >
              {t(c.k)}
            </button>
          ))}
        </div>
      </section>

      {/* Service grid */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((s, i) => (
                <motion.div
                  layout
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                  className="card-ink p-7 flex flex-col relative"
                >
                  {s.popular && (
                    <span className="absolute -top-3 left-6 tape-blood tape text-[.6rem]">★ Most ordered</span>
                  )}
                  <div className="flex items-start justify-between mb-5">
                    <div className="text-3xl">{s.emoji}</div>
                    <div className="font-stencil text-[.6rem] tracking-stencil text-fog">
                      {s.duration} {t('services.duration')}
                    </div>
                  </div>
                  <h3 className="font-display text-bone text-2xl leading-tight mb-3">
                    {t(`services.items.${s.i18nKey}.name`)}
                  </h3>
                  <p className="text-fog text-sm leading-relaxed flex-1">
                    {t(`services.items.${s.i18nKey}.desc`)}
                  </p>
                  <div className="flex items-end justify-between mt-6 pt-6 border-t border-bone/10">
                    <div>
                      <div className="font-stencil text-[.6rem] tracking-stencil text-fog">USD</div>
                      <div className="font-display text-brass text-3xl leading-none">${s.price}</div>
                    </div>
                    <Link to="/booking" state={{ serviceId: s.id }} className="btn btn-outline text-[.65rem] py-2.5 px-4">
                      {t('services.book')}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-graphite py-16 border-t border-bone/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="chrome-rule mb-4">{t('booking.eyebrow')}</div>
          <h3 className="font-display text-bone text-3xl md:text-5xl leading-tight">
            {t('booking.title')}
          </h3>
          <Link to="/booking" className="btn btn-brass btn-shine mt-8">{t('hero.ctaBook')}</Link>
        </div>
      </section>
    </PageWrap>
  )
}
