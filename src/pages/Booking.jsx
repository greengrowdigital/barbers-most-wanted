import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import { useBooking } from '../state/BookingContext.jsx'
import { SERVICES, BARBERS } from '../data/services.js'

const STEPS = ['service', 'barber', 'time', 'details', 'payment', 'confirm']

export default function Booking() {
  const { t, lang } = useI18n()
  const { booking, update, updateCard, finalize, reset } = useBooking()
  const location = useLocation()
  const [step, setStep] = useState(0)

  // pre-select from navigation state (e.g. from Services page)
  useEffect(() => {
    if (location.state?.serviceId) update({ serviceId: location.state.serviceId })
    if (location.state?.barberId)  update({ barberId: location.state.barberId })
    // eslint-disable-next-line
  }, [])

  const service = SERVICES.find(s => s.id === booking.serviceId)
  const barber  = BARBERS.find(b => b.id === booking.barberId)
  const subtotal = service?.price || 0
  const suggestedTip = Math.round(subtotal * 0.2)
  const total = booking.payMethod === 'now' ? subtotal : 0

  const canContinue = useMemo(() => {
    switch (STEPS[step]) {
      case 'service': return !!booking.serviceId
      case 'barber':  return !!booking.barberId
      case 'time':    return !!booking.date && !!booking.time
      case 'details': return booking.firstName.trim() && booking.lastName.trim() && booking.phone.trim() && booking.email.trim()
      case 'payment':
        if (booking.payMethod === 'shop') return true
        return booking.card.number.replace(/\s/g,'').length >= 14 &&
               booking.card.expiry.length >= 5 &&
               booking.card.cvc.length >= 3 &&
               booking.card.name.trim()
      default: return true
    }
  }, [step, booking])

  const goNext = () => {
    if (STEPS[step] === 'payment') {
      finalize()
      setStep(s => s + 1)
    } else {
      setStep(s => Math.min(s + 1, STEPS.length - 1))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const goBack = () => {
    setStep(s => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageWrap>
      <section className="relative pt-20 pb-10 md:pt-28 md:pb-12 bg-ink grain overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-stencil text-[.7rem] tracking-stencil text-brass mb-4">✦ {t('booking.eyebrow')}</div>
          <h1 className="font-display text-bone" style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)', lineHeight: 0.9 }}>
            {t('booking.title')}
          </h1>
          <p className="text-fog text-base md:text-lg mt-4 max-w-2xl">{t('booking.subtitle')}</p>
        </div>
      </section>

      {/* Stepper */}
      <section className="bg-graphite border-y border-bone/5 sticky top-[64px] z-30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            {STEPS.map((sId, i) => {
              const done = i < step || STEPS[step] === 'confirm'
              const active = i === step
              return (
                <div key={sId} className="flex items-center flex-1 last:flex-none">
                  <div className={"step-dot " + (active ? 'active' : done ? 'done' : '')}>{i + 1}</div>
                  {i < STEPS.length - 1 && <div className={"step-bar mx-2 " + (i < step ? 'done' : '')} />}
                </div>
              )
            })}
          </div>
          <div className="hidden md:flex items-center justify-between mt-3 px-1">
            {STEPS.map((sId, i) => (
              <span key={sId} className={"font-stencil text-[.6rem] tracking-stencil " + (i <= step ? 'text-brass' : 'text-fog/60')}>
                {t(`booking.steps.${sId}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-ink">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10">
          {/* Wizard panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {STEPS[step] === 'service' && (
                <Step key="service">
                  <StepHeader title={t('booking.pickService')} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {SERVICES.map(s => (
                      <ServiceCard
                        key={s.id}
                        service={s}
                        selected={booking.serviceId === s.id}
                        onSelect={() => update({ serviceId: s.id })}
                        t={t}
                      />
                    ))}
                  </div>
                </Step>
              )}

              {STEPS[step] === 'barber' && (
                <Step key="barber">
                  <StepHeader title={t('booking.pickBarber')} />
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <BarberCard
                      barber={{ id: 'any', img: null }}
                      label={t('booking.anyBarber')}
                      sub={t('booking.anyBarberDesc')}
                      selected={booking.barberId === 'any'}
                      onSelect={() => update({ barberId: 'any' })}
                    />
                    {BARBERS.map(b => (
                      <BarberCard
                        key={b.id}
                        barber={b}
                        label={t(`barbers.list.${b.i18nKey}.name`)}
                        sub={t(`barbers.list.${b.i18nKey}.spec`)}
                        selected={booking.barberId === b.id}
                        onSelect={() => update({ barberId: b.id })}
                      />
                    ))}
                  </div>
                </Step>
              )}

              {STEPS[step] === 'time' && (
                <Step key="time">
                  <StepHeader title={t('booking.pickDate')} />
                  <DatePicker
                    lang={lang}
                    value={booking.date}
                    onChange={d => update({ date: d, time: null })}
                  />
                  <div className="mt-10">
                    <StepHeader title={t('booking.pickTime')} small />
                    <TimePicker
                      date={booking.date}
                      value={booking.time}
                      onChange={tm => update({ time: tm })}
                      emptyLabel={t('booking.noSlots')}
                    />
                  </div>
                </Step>
              )}

              {STEPS[step] === 'details' && (
                <Step key="details">
                  <StepHeader title={t('booking.details.title')} subtitle={t('booking.details.sub')} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label={t('booking.details.firstName')} value={booking.firstName} onChange={v => update({ firstName: v })} required />
                    <Field label={t('booking.details.lastName')}  value={booking.lastName}  onChange={v => update({ lastName: v })}  required />
                    <Field label={t('booking.details.phone')} value={booking.phone} onChange={v => update({ phone: v })} required type="tel" placeholder="(516) 555-0142" />
                    <Field label={t('booking.details.email')} value={booking.email} onChange={v => update({ email: v })} required type="email" placeholder="you@email.com" />
                    <Field label={t('booking.details.notes')} value={booking.notes} onChange={v => update({ notes: v })} textarea className="sm:col-span-2" />
                  </div>
                </Step>
              )}

              {STEPS[step] === 'payment' && (
                <Step key="payment">
                  <StepHeader title={t('booking.payment.title')} subtitle={t('booking.payment.sub')} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <PayMethodCard
                      icon="💵"
                      title={t('booking.payment.payInShop')}
                      desc={t('booking.payment.payInShopDesc')}
                      selected={booking.payMethod === 'shop'}
                      onSelect={() => update({ payMethod: 'shop' })}
                    />
                    <PayMethodCard
                      icon="💳"
                      title={t('booking.payment.payNow')}
                      desc={t('booking.payment.payNowDesc')}
                      selected={booking.payMethod === 'now'}
                      onSelect={() => update({ payMethod: 'now' })}
                    />
                  </div>

                  <AnimatePresence>
                    {booking.payMethod === 'now' && (
                      <motion.div
                        initial={{ opacity: 0, y: 14, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: 14, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 overflow-hidden"
                      >
                        <CardPanel t={t} card={booking.card} updateCard={updateCard} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Step>
              )}

              {STEPS[step] === 'confirm' && (
                <Step key="confirm">
                  <ConfirmScreen
                    t={t}
                    confirmation={booking.confirmation}
                    onAnother={() => { reset(); setStep(0); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  />
                </Step>
              )}
            </AnimatePresence>

            {STEPS[step] !== 'confirm' && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-bone/10">
                <button
                  onClick={goBack}
                  disabled={step === 0}
                  className="btn btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
                >← {t('booking.cta.back')}</button>
                <button
                  onClick={goNext}
                  disabled={!canContinue}
                  className="btn btn-brass btn-shine disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {STEPS[step] === 'payment' ? t('booking.cta.placeOrder') : t('booking.cta.next')} →
                </button>
              </div>
            )}
          </div>

          {/* Summary card */}
          <aside className="lg:col-span-4">
            <div className="card-ink p-7 lg:sticky lg:top-32">
              <div className="chrome-rule left mb-5">{t('booking.summary.title')}</div>

              <SummaryRow label={t('booking.summary.service')} value={service ? t(`services.items.${service.i18nKey}.name`) : '—'} />
              <SummaryRow label={t('booking.summary.duration')} value={service ? `${service.duration} ${t('services.duration')}` : '—'} />
              <SummaryRow label={t('booking.summary.barber')} value={
                booking.barberId === 'any' ? t('booking.anyBarber')
                : barber ? t(`barbers.list.${barber.i18nKey}.name`) : '—'
              } />
              <SummaryRow label={t('booking.summary.when')} value={
                booking.date && booking.time ? `${formatDate(booking.date, lang)} · ${booking.time}` : '—'
              } />

              <div className="divider-skinny my-5" />

              <SummaryRow label={t('booking.summary.subtotal')} value={service ? `$${service.price}` : '—'} />
              <SummaryRow label={t('booking.summary.tip')} value={service ? `$${suggestedTip}` : '—'} small note={t('booking.summary.tipNote')} />

              <div className="flex items-end justify-between mt-5 pt-5 border-t border-bone/10">
                <div className="font-stencil text-[.6rem] tracking-stencil text-fog">{t('booking.summary.total')}</div>
                <div className="font-display text-brass text-4xl leading-none">
                  {total > 0 ? `$${total}` : t('booking.summary.free')}
                </div>
              </div>

              {/* Walk-in card */}
              <div className="mt-8 p-5 border border-blood/40 bg-blood/5">
                <div className="font-stencil text-[.6rem] tracking-stencil text-blood mb-2">★ Walk-in</div>
                <div className="font-display text-bone text-xl leading-tight">{t('booking.walkin.title')}</div>
                <div className="text-fog text-sm mt-2 leading-relaxed">{t('booking.walkin.sub')}</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageWrap>
  )
}

/* ============================================================
   Sub-components
============================================================ */

function Step({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  )
}

function StepHeader({ title, subtitle, small }) {
  return (
    <div className="mb-6">
      <h2 className={`font-display text-bone leading-tight ${small ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'}`}>{title}</h2>
      {subtitle && <p className="text-fog mt-2">{subtitle}</p>}
    </div>
  )
}

function SummaryRow({ label, value, small, note }) {
  return (
    <div className="mb-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className={"font-stencil tracking-stencil " + (small ? "text-[.55rem] text-fog/80" : "text-[.6rem] text-fog")}>
          {label}
        </span>
        <span className="text-bone text-sm text-right">{value}</span>
      </div>
      {note && <div className="text-fog/70 text-xs mt-1">{note}</div>}
    </div>
  )
}

function ServiceCard({ service, selected, onSelect, t }) {
  return (
    <button
      type="button" onClick={onSelect}
      className={
        "text-left p-5 border transition-all relative " +
        (selected ? "border-brass bg-brass/5" : "border-bone/10 bg-graphite hover:border-bone/30")
      }
    >
      {selected && <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brass text-ink text-xs flex items-center justify-center">✓</span>}
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{service.emoji}</div>
        <div className="font-stencil text-[.6rem] tracking-stencil text-fog">{service.duration} {t('services.duration')}</div>
      </div>
      <div className="font-display text-bone text-xl leading-tight">{t(`services.items.${service.i18nKey}.name`)}</div>
      <div className="flex items-end justify-between mt-3">
        <p className="text-fog text-xs leading-relaxed line-clamp-2 pr-2">{t(`services.items.${service.i18nKey}.desc`)}</p>
        <div className="font-display text-brass text-2xl leading-none">${service.price}</div>
      </div>
    </button>
  )
}

function BarberCard({ barber, label, sub, selected, onSelect }) {
  return (
    <button
      type="button" onClick={onSelect}
      className={
        "text-left p-4 border transition-all relative overflow-hidden " +
        (selected ? "border-brass bg-brass/5" : "border-bone/10 bg-graphite hover:border-bone/30")
      }
    >
      {selected && <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brass text-ink text-xs flex items-center justify-center z-10">✓</span>}
      {barber.img ? (
        <div className="aspect-square overflow-hidden mb-4 bg-ink">
          <img src={barber.img} alt="" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-square mb-4 bg-ink border border-bone/10 flex items-center justify-center">
          <span className="text-5xl text-brass">✦</span>
        </div>
      )}
      <div className="font-display text-bone text-xl leading-tight">{label}</div>
      <div className="font-stencil text-[.6rem] tracking-stencil text-fog mt-1">{sub}</div>
    </button>
  )
}

function DatePicker({ value, onChange, lang }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() + i); return d
  })
  const isClosed = (d) => d.getDay() === 1 // Mondays closed
  const fmtIso = (d) => d.toISOString().slice(0, 10)
  return (
    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
      {days.map((d) => {
        const iso = fmtIso(d)
        const closed = isClosed(d)
        const selected = value === iso
        const label = d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'short' })
        return (
          <button
            key={iso}
            disabled={closed}
            onClick={() => onChange(iso)}
            className={
              "p-3 border transition text-center " +
              (closed
                ? "border-bone/5 bg-graphite/40 text-fog/40 cursor-not-allowed"
                : selected
                  ? "border-brass bg-brass text-ink"
                  : "border-bone/10 bg-graphite text-bone hover:border-brass hover:text-brass")
            }
          >
            <div className="font-stencil text-[.6rem] tracking-stencil">{label}</div>
            <div className="font-display text-2xl mt-1">{d.getDate()}</div>
            {closed && <div className="text-[.55rem] mt-1 opacity-70">Closed</div>}
          </button>
        )
      })}
    </div>
  )
}

function TimePicker({ date, value, onChange, emptyLabel }) {
  if (!date) {
    return <div className="text-fog text-sm border border-dashed border-bone/15 p-6 text-center">Pick a date first</div>
  }
  // Generate slots 9am - 6pm every 30 min
  const slots = []
  for (let h = 9; h <= 18; h++) {
    for (let m of [0, 30]) {
      const label = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      // Mock: randomly disable ~25% of slots (deterministic by date+time)
      const seed = date + label
      const disabled = (hashCode(seed) % 4 === 0) && h !== 9
      slots.push({ label, disabled })
    }
  }
  const available = slots.filter(s => !s.disabled)
  if (available.length === 0) {
    return <div className="text-fog text-sm border border-dashed border-bone/15 p-6 text-center">{emptyLabel}</div>
  }
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
      {slots.map(s => {
        const selected = value === s.label
        return (
          <button
            key={s.label}
            disabled={s.disabled}
            onClick={() => onChange(s.label)}
            className={
              "py-3 border transition font-mono text-sm " +
              (s.disabled
                ? "border-bone/5 bg-graphite/40 text-fog/40 cursor-not-allowed line-through"
                : selected
                  ? "border-brass bg-brass text-ink"
                  : "border-bone/10 bg-graphite text-bone hover:border-brass hover:text-brass")
            }
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}

function Field({ label, value, onChange, required, type = 'text', placeholder, textarea, className = '' }) {
  return (
    <div className={className}>
      <label className="field-label">{label}{required && <span className="text-blood ml-1">*</span>}</label>
      {textarea
        ? <textarea rows="4" value={value} onChange={e => onChange(e.target.value)} className="field resize-none" />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="field" />
      }
    </div>
  )
}

function PayMethodCard({ icon, title, desc, selected, onSelect }) {
  return (
    <button
      type="button" onClick={onSelect}
      className={
        "text-left p-6 border transition-all relative " +
        (selected ? "border-brass bg-brass/5" : "border-bone/10 bg-graphite hover:border-bone/30")
      }
    >
      {selected && <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brass text-ink text-xs flex items-center justify-center">✓</span>}
      <div className="text-3xl mb-4">{icon}</div>
      <div className="font-display text-bone text-xl leading-tight">{title}</div>
      <div className="text-fog text-sm mt-2 leading-relaxed">{desc}</div>
    </button>
  )
}

function CardPanel({ t, card, updateCard }) {
  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExp  = (v) => {
    const x = v.replace(/\D/g, '').slice(0, 4)
    if (x.length < 3) return x
    return x.slice(0, 2) + ' / ' + x.slice(2)
  }
  return (
    <div className="card-ink p-6">
      {/* Visual card */}
      <div className="relative aspect-[8/5] max-w-sm mx-auto mb-8 p-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a22 0%, #2a2a35 100%)', border: '1px solid rgba(200,162,76,.25)' }}>
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(circle at 80% 0%, rgba(200,162,76,.45) 0%, transparent 50%)'
        }} />
        <div className="relative flex items-start justify-between">
          <div className="font-stencil text-[.55rem] tracking-stencil text-brass">BMW · CHAIR PASS</div>
          <div className="font-display text-brass text-sm">VISA</div>
        </div>
        <div className="relative font-mono text-bone text-lg md:text-xl mt-8 tracking-widest">
          {card.number || '•••• •••• •••• ••••'}
        </div>
        <div className="relative flex items-end justify-between mt-6">
          <div>
            <div className="font-stencil text-[.5rem] tracking-stencil text-fog">CARDHOLDER</div>
            <div className="font-mono text-bone text-sm uppercase">{card.name || 'YOUR NAME'}</div>
          </div>
          <div className="text-right">
            <div className="font-stencil text-[.5rem] tracking-stencil text-fog">EXPIRES</div>
            <div className="font-mono text-bone text-sm">{card.expiry || 'MM / YY'}</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t('booking.payment.cardNumber')} value={card.number} onChange={v => updateCard({ number: formatCard(v) })} placeholder="4242 4242 4242 4242" required className="sm:col-span-2" />
        <Field label={t('booking.payment.cardholder')} value={card.name} onChange={v => updateCard({ name: v })} required />
        <Field label={t('booking.payment.zip')} value={card.zip} onChange={v => updateCard({ zip: v })} placeholder="11572" />
        <Field label={t('booking.payment.expiry')} value={card.expiry} onChange={v => updateCard({ expiry: formatExp(v) })} placeholder="12 / 28" required />
        <Field label={t('booking.payment.cvc')} value={card.cvc} onChange={v => updateCard({ cvc: v.replace(/\D/g,'').slice(0,4) })} placeholder="123" required />
      </div>

      <div className="mt-5 font-stencil text-[.6rem] tracking-stencil text-fog/70 flex items-center gap-2">
        <span>🔒</span><span>{t('booking.payment.secure')}</span>
      </div>
    </div>
  )
}

function ConfirmScreen({ t, confirmation, onAnother }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 14 }}
        className="w-24 h-24 rounded-full bg-brass text-ink flex items-center justify-center mx-auto mb-6 font-display text-5xl"
      >✓</motion.div>
      <h2 className="font-display text-bone" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 0.95 }}>
        {t('booking.confirm.title')}
      </h2>
      <p className="text-fog mt-4 max-w-md mx-auto">{t('booking.confirm.sub')}</p>
      <div className="inline-block mt-8 px-6 py-4 border border-brass/40 bg-brass/5">
        <div className="font-stencil text-[.6rem] tracking-stencil text-brass">{t('booking.confirm.ref')}</div>
        <div className="font-mono text-bone text-xl mt-1">{confirmation}</div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3 justify-center">
        <a
          href="https://maps.google.com/?q=2786+Long+Beach+Rd+Oceanside+NY"
          target="_blank" rel="noopener"
          className="btn btn-outline"
        >{t('booking.confirm.viewMap')}</a>
        <button onClick={onAnother} className="btn btn-brass btn-shine">
          {t('booking.confirm.bookAnother')}
        </button>
        <Link to="/" className="btn btn-ghost">← Home</Link>
      </div>
    </motion.div>
  )
}

/* ============================================================
   Helpers
============================================================ */

function formatDate(iso, lang) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function hashCode(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}
