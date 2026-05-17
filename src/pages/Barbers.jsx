import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { BARBERS } from '../data/services.js'

export default function Barbers() {
  const { t } = useI18n()
  const [active, setActive] = useState(BARBERS[0].id)
  const current = BARBERS.find(b => b.id === active)

  return (
    <PageWrap>
      <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 bg-ink grain overflow-hidden">
        <div className="spot -top-40 left-0" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-stencil text-[.65rem] sm:text-[.7rem] tracking-stencil text-brass mb-4">✦ {t('barbers.eyebrow')}</div>
          <h1 className="font-display text-bone page-title">
            {t('barbers.title')}
          </h1>
          <p className="text-fog text-base md:text-lg mt-5 max-w-2xl leading-relaxed">{t('barbers.subtitle')}</p>
        </div>
      </section>

      {/* Selector */}
      <section className="py-12 md:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Tabs (left on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-px bg-bone/10 border border-bone/10">
            {BARBERS.map(b => {
              const isActive = active === b.id
              return (
                <button
                  key={b.id}
                  onClick={() => setActive(b.id)}
                  className={
                    'text-left p-6 transition relative ' +
                    (isActive ? 'bg-graphite' : 'bg-ink hover:bg-graphite/60')
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-bone text-2xl leading-tight">
                        {t(`barbers.list.${b.i18nKey}.name`)}
                      </div>
                      <div className="font-stencil text-[.6rem] tracking-stencil mt-1" style={{ color: b.color }}>
                        {t(`barbers.list.${b.i18nKey}.role`)}
                      </div>
                    </div>
                    <div className="font-display text-brass text-3xl">{b.years}</div>
                  </div>
                  {isActive && (
                    <motion.span
                      layoutId="barber-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ background: b.color }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Detail */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-graphite">
                  <img
                    src={current.img}
                    alt={t(`barbers.list.${current.i18nKey}.name`)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 tape" style={{ background: current.color }}>
                    {current.years} {t('barbers.yearsExp')}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-stencil text-[.65rem] tracking-stencil text-brass mb-3">
                    ✦ {t('barbers.specialty')}
                  </div>
                  <div className="font-display text-bone text-3xl md:text-4xl leading-tight">
                    {t(`barbers.list.${current.i18nKey}.spec`)}
                  </div>
                  <div className="divider-skinny my-6" />
                  <p className="text-fog text-base leading-relaxed">
                    {t(`barbers.list.${current.i18nKey}.bio`)}
                  </p>
                  <div className="mt-auto pt-8 flex gap-4">
                    <Link to="/booking" state={{ barberId: current.id }} className="btn btn-brass btn-shine">
                      {t('barbers.book')} {t(`barbers.list.${current.i18nKey}.name`)}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* All barbers grid (alternative view) */}
      <section className="py-12 md:py-20 bg-graphite border-t border-bone/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="chrome-rule mb-10">All barbers · Todos los barberos</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BARBERS.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: i * 0.08 }}
                onClick={() => { setActive(b.id); window.scrollTo({ top: 200, behavior: 'smooth' }) }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                  <img
                    src={b.img} alt={t(`barbers.list.${b.i18nKey}.name`)}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="font-display text-bone text-xl">{t(`barbers.list.${b.i18nKey}.name`)}</div>
                    <div className="font-stencil text-[.6rem] tracking-stencil" style={{ color: b.color }}>
                      {t(`barbers.list.${b.i18nKey}.role`)}
                    </div>
                  </div>
                  <div className="font-display text-brass text-2xl">{b.years}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrap>
  )
}
