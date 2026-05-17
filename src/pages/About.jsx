import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function About() {
  const { t } = useI18n()
  const values = ['v1','v2','v3','v4']
  return (
    <PageWrap>
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-36 md:pb-16 bg-ink grain overflow-hidden">
        <div className="spot -top-40 -left-20" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-stencil text-[.7rem] tracking-stencil text-brass mb-5">✦ {t('about.eyebrow')}</div>
          <h1 className="font-display text-bone" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', lineHeight: 0.9 }}>
            {t('about.title')}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80&auto=format&fit=crop"
                alt="The shop" className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="aspect-square overflow-hidden bg-graphite">
                <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden bg-graphite">
                <img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 lg:pl-8">
            <p className="text-fog text-lg leading-relaxed mb-6">{t('about.p1')}</p>
            <p className="text-fog text-lg leading-relaxed mb-6">{t('about.p2')}</p>
            <p className="text-fog text-lg leading-relaxed">{t('about.p3')}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 brick-bg grain border-y border-bone/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="chrome-rule mb-10">{t('about.values.title')}</div>
          <div className="grid md:grid-cols-2 gap-px bg-bone/10 border border-bone/10">
            {values.map((v, i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: i * 0.08 }}
                className="bg-ink p-10"
              >
                <div className="font-display text-brass text-6xl leading-none mb-6">0{i+1}</div>
                <h3 className="font-display text-bone text-2xl mb-3 leading-tight">{t(`about.values.${v}.t`)}</h3>
                <p className="text-fog text-base leading-relaxed">{t(`about.values.${v}.b`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-display text-bone text-3xl md:text-5xl leading-tight">
            {t('booking.title')}
          </h3>
          <p className="text-fog mt-4">{t('booking.subtitle')}</p>
          <Link to="/booking" className="btn btn-brass btn-shine mt-8">{t('hero.ctaBook')}</Link>
        </div>
      </section>
    </PageWrap>
  )
}
