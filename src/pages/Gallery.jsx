import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { GALLERY } from '../data/services.js'

export default function Gallery() {
  const { t } = useI18n()
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filters = [
    { id: 'all', k: 'gallery.filter.all' },
    { id: 'cuts', k: 'gallery.filter.cuts' },
    { id: 'beards', k: 'gallery.filter.beards' },
    { id: 'shop', k: 'gallery.filter.shop' },
  ]

  const filtered = useMemo(
    () => filter === 'all' ? GALLERY : GALLERY.filter(g => g.cat === filter),
    [filter]
  )

  return (
    <PageWrap>
      <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 bg-ink grain overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-stencil text-[.65rem] sm:text-[.7rem] tracking-stencil text-brass mb-4">✦ {t('gallery.eyebrow')}</div>
          <h1 className="font-display text-bone page-title">
            {t('gallery.title')}
          </h1>
          <p className="text-fog text-base md:text-lg mt-5 max-w-2xl leading-relaxed">{t('gallery.subtitle')}</p>
        </div>
      </section>

      <section className="bg-graphite border-y border-bone/5 sticky top-[64px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={
                'px-5 py-2.5 font-condensed text-[.72rem] tracking-stencil border transition ' +
                (filter === f.id
                  ? 'bg-brass border-brass text-ink'
                  : 'bg-transparent border-bone/15 text-bone hover:border-brass hover:text-brass')
              }
            >
              {t(f.k)}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((g, i) => (
                <motion.button
                  layout
                  key={g.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.04 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightbox(g)}
                  className={
                    'relative aspect-square overflow-hidden bg-graphite group ' +
                    (i % 7 === 0 ? 'md:col-span-2 md:row-span-2 md:aspect-auto' : '')
                  }
                >
                  <img src={g.src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <span className="absolute bottom-3 left-3 font-stencil text-[.6rem] tracking-stencil text-brass opacity-0 group-hover:opacity-100 transition">
                    {g.cat.toUpperCase()}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 border border-brass/40 text-brass text-2xl flex items-center justify-center"
              onClick={() => setLightbox(null)}
            >×</button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={lightbox.src} alt="" className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrap>
  )
}
