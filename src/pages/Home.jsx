import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import Marquee from '../components/Marquee.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { SERVICES, BARBERS } from '../data/services.js'

const titleWord = {
  hidden: { y: '100%', opacity: 0 },
  show:   { y: 0, opacity: 1, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
}
const titleStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
}

export default function Home() {
  const { t } = useI18n()
  const popular = SERVICES.filter(s => s.popular).slice(0, 4)

  return (
    <PageWrap>
      {/* ============== HERO ============== */}
      <section className="relative min-h-[560px] h-[calc(100vh-110px)] max-h-[900px] flex items-end overflow-hidden grain bg-ink">
        {/* Background image with parallax-ish scale */}
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=2400&q=80&auto=format&fit=crop"
            alt="Barbers Most Wanted shop"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(7,7,10,.65) 0%, rgba(7,7,10,.3) 35%, rgba(7,7,10,.95) 100%)'
        }} />
        <div className="spot top-[10%] -left-40" />
        <div className="spot bottom-[5%] -right-40" />

        {/* Vertical side rule */}
        <div className="hidden lg:flex absolute left-6 top-0 bottom-0 flex-col items-center justify-between py-12 z-10">
          <div className="font-stencil text-[.65rem] tracking-stencil text-brass rotate-180" style={{ writingMode: 'vertical-rl' }}>
            EST · 2008 · OCEANSIDE
          </div>
          <div className="w-px flex-1 my-6 bg-gradient-to-b from-transparent via-brass/40 to-transparent" />
          <div className="font-stencil text-[.65rem] tracking-stencil text-brass" style={{ writingMode: 'vertical-rl' }}>
            BMW · NEW YORK
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 w-full pb-10 sm:pb-14 pt-20 sm:pt-24 z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-stencil text-[.65rem] sm:text-[.7rem] tracking-stencil text-brass mb-4 sm:mb-6"
          >
            ✦ {t('hero.eyebrow')}
          </motion.div>

          <motion.h1
            variants={titleStagger}
            initial="hidden"
            animate="show"
            className="font-display text-bone hero-title"
          >
            <div className="overflow-hidden">
              <motion.div variants={titleWord}>{t('hero.title1')}</motion.div>
            </div>
            <div className="overflow-hidden flex flex-wrap items-baseline gap-x-6">
              <motion.div variants={titleWord} className="text-stroke-brass">{t('hero.title2')}</motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div variants={titleWord} className="text-blood">{t('hero.title3')}</motion.div>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-5 sm:mt-7 max-w-xl text-bone/85 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4"
          >
            <Link to="/booking" className="btn btn-brass btn-shine">{t('hero.ctaBook')}</Link>
            <Link to="/contact" className="btn btn-outline">{t('hero.ctaWalk')}</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.6 }}
            className="mt-8 sm:mt-12 flex items-center gap-6 sm:gap-10 md:gap-14"
          >
            <div>
              <div className="num-big text-brass">17+</div>
              <div className="font-stencil text-[.6rem] sm:text-[.65rem] tracking-stencil text-fog mt-1 sm:mt-2">{t('hero.stat1')}</div>
            </div>
            <div className="w-px h-8 sm:h-12 bg-bone/15" />
            <div>
              <div className="num-big text-bone">04</div>
              <div className="font-stencil text-[.6rem] sm:text-[.65rem] tracking-stencil text-fog mt-1 sm:mt-2">{t('hero.stat2')}</div>
            </div>
            <div className="w-px h-8 sm:h-12 bg-bone/15" />
            <div>
              <div className="num-big text-bone">820+</div>
              <div className="font-stencil text-[.6rem] sm:text-[.65rem] tracking-stencil text-fog mt-1 sm:mt-2">{t('hero.stat3')}</div>
            </div>
          </motion.div>

          <div className="hidden md:flex absolute right-8 bottom-10 flex-col items-center gap-2 text-fog">
            <span className="font-stencil text-[.6rem] tracking-stencil">{t('hero.scroll')}</span>
            <span className="scroll-cue" />
          </div>
        </div>
      </section>

      {/* ============== MARQUEE ============== */}
      <Marquee text={t('marquee')} />

      {/* ============== INTRO / ABOUT PREVIEW ============== */}
      <section className="relative py-16 md:py-24 grain bg-ink overflow-hidden">
        <div className="spot top-[-200px] right-[-200px]" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=80&auto=format&fit=crop"
                alt="Inside the shop" className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brass text-ink p-6 max-w-[200px]">
              <div className="font-display text-3xl">2008</div>
              <div className="font-stencil text-[.65rem] tracking-stencil mt-1">
                {t('intro.fact3')}
              </div>
            </div>
            <div className="absolute -top-4 -left-4 tape">{t('brand.tagline')}</div>
          </motion.div>

          <div className="lg:col-span-7 lg:pl-10">
            <div className="chrome-rule left mb-6">{t('intro.eyebrow')}</div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}
              className="font-display text-bone mb-6 section-title"
            >
              {t('intro.title')}
            </motion.h2>
            <p className="text-fog text-base md:text-lg leading-relaxed mb-4">{t('intro.body')}</p>
            <p className="text-fog text-base md:text-lg leading-relaxed">{t('intro.body2')}</p>

            <div className="grid grid-cols-3 gap-6 mt-10 border-t border-bone/10 pt-8">
              <div>
                <div className="num-big text-brass">04</div>
                <div className="font-stencil text-[.6rem] tracking-stencil text-fog mt-1">{t('intro.fact1')}</div>
              </div>
              <div>
                <div className="num-big text-bone">12k</div>
                <div className="font-stencil text-[.6rem] tracking-stencil text-fog mt-1">{t('intro.fact2')}</div>
              </div>
              <div>
                <div className="num-big text-blood">17</div>
                <div className="font-stencil text-[.6rem] tracking-stencil text-fog mt-1">{t('intro.fact3')}</div>
              </div>
            </div>

            <Link to="/about" className="btn btn-outline mt-10">{t('intro.cta')}</Link>
          </div>
        </div>
      </section>

      {/* ============== SERVICES PREVIEW ============== */}
      <section className="relative py-14 md:py-20 bg-graphite border-y border-bone/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow={t('services.eyebrow')}
            title={t('services.title')}
            subtitle={t('services.subtitle')}
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
            {popular.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card-ink p-7 flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
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
                  <Link to="/booking" className="font-condensed text-[.7rem] tracking-stencil text-bone hover:text-brass transition">
                    {t('services.book')} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-outline">{t('services.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* ============== WHY US ============== */}
      <section className="relative py-14 md:py-20 brick-bg grain overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow={t('why.eyebrow')}
            title={t('why.title')}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-bone/10 mt-16 border border-bone/10">
            {['one','two','three','four'].map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: i * 0.08 }}
                className="bg-ink p-8 hover:bg-graphite transition"
              >
                <div className="font-display text-brass text-5xl leading-none mb-6">0{i+1}</div>
                <h3 className="font-display text-bone text-xl mb-3 leading-tight">{t(`why.${k}.title`)}</h3>
                <p className="text-fog text-sm leading-relaxed">{t(`why.${k}.body`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== BARBERS PREVIEW ============== */}
      <section className="relative py-14 md:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow={t('barbers.eyebrow')}
            title={t('barbers.title')}
            subtitle={t('barbers.subtitle')}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {BARBERS.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group cursor-default"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-graphite">
                  <img
                    src={b.img} alt={t(`barbers.list.${b.i18nKey}.name`)}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 tape" style={{ background: b.color, transform: 'rotate(-2deg)' }}>
                    {b.years} {t('barbers.yearsExp')}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-bone text-2xl">{t(`barbers.list.${b.i18nKey}.name`)}</h3>
                  <div className="font-stencil text-[.65rem] tracking-stencil text-brass mt-1">
                    {t(`barbers.list.${b.i18nKey}.role`)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/barbers" className="btn btn-outline">{t('nav.barbers')} →</Link>
          </div>
        </div>
      </section>

      {/* ============== CTA STRIP ============== */}
      <section className="relative py-14 md:py-20 bg-blood overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <div className="font-stencil text-[.7rem] tracking-stencil text-bone/80 mb-6">✦ {t('booking.eyebrow')}</div>
          <h2 className="font-display text-bone section-title">
            {t('booking.title')}
          </h2>
          <p className="text-bone/85 text-lg mt-6 max-w-2xl mx-auto">{t('booking.subtitle')}</p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="btn bg-bone text-blood btn-shine hover:bg-paper">
              {t('hero.ctaBook')}
            </Link>
            <a href="tel:+15165550142" className="btn btn-ghost border-bone/40 text-bone hover:border-bone hover:text-bone">
              (516) 555-0142
            </a>
          </div>
        </div>
      </section>
    </PageWrap>
  )
}
