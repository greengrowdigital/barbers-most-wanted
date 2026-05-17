import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function Contact() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    e.target.reset()
  }

  return (
    <PageWrap>
      <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 bg-ink grain overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-stencil text-[.65rem] sm:text-[.7rem] tracking-stencil text-brass mb-4">✦ {t('contact.eyebrow')}</div>
          <h1 className="font-display text-bone page-title">
            {t('contact.title')}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
            className="lg:col-span-5 card-ink p-8"
          >
            <div className="chrome-rule left mb-6">Info</div>

            <div className="space-y-6">
              <Info label={t('contact.addressLabel')} value={t('contact.address')} />
              <Info label={t('contact.phoneLabel')} value={t('contact.phone')} href="tel:+15165550142" />
              <Info label={t('contact.emailLabel')} value={t('contact.email')} href="mailto:hello@barbersmostwanted.com" />
            </div>

            <div className="mt-8 pt-8 border-t border-bone/10">
              <div className="font-stencil text-[.6rem] tracking-stencil text-fog mb-3">{t('contact.hoursLabel')}</div>
              <ul className="text-bone text-sm space-y-1 font-mono">
                {t('contact.hours').map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=2786+Long+Beach+Rd+Oceanside+NY"
                target="_blank" rel="noopener"
                className="btn btn-outline text-[.65rem]"
              >{t('contact.directions')}</a>
              <a href="tel:+15165550142" className="btn btn-brass btn-shine text-[.65rem]">
                {t('contact.callShop')}
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-bone text-3xl md:text-4xl mb-3">{t('contact.formTitle')}</h2>
            <p className="text-fog mb-8">{t('contact.formSubtitle')}</p>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="field-label">{t('contact.name')}</label>
                <input required type="text" className="field" />
              </div>
              <div>
                <label className="field-label">{t('contact.emailField')}</label>
                <input required type="email" className="field" />
              </div>
              <div>
                <label className="field-label">{t('contact.message')}</label>
                <textarea required rows="5" className="field resize-none" />
              </div>
              <button type="submit" className="btn btn-brass btn-shine">
                {t('contact.send')}
              </button>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="font-stencil text-[.7rem] tracking-stencil text-brass mt-4 border border-brass/40 p-4"
                >
                  ✓ {t('contact.sent')}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-graphite border-t border-bone/5">
        <div className="aspect-[16/7] w-full">
          <iframe
            title="Map"
            src="https://www.google.com/maps?q=2786+Long+Beach+Rd+Oceanside+NY&output=embed"
            className="w-full h-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </PageWrap>
  )
}

function Info({ label, value, href }) {
  return (
    <div>
      <div className="font-stencil text-[.6rem] tracking-stencil text-fog mb-1">{label}</div>
      {href
        ? <a href={href} className="text-bone hover:text-brass transition text-base">{value}</a>
        : <div className="text-bone text-base">{value}</div>}
    </div>
  )
}
