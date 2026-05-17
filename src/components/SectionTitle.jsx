import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center'
  const titleColor = light ? 'text-bone' : 'text-bone'
  return (
    <div className={"flex flex-col gap-4 " + alignClass}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}
          className="font-stencil text-[.7rem] tracking-stencil text-brass"
        >
          ✦ {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`font-display ${titleColor}`}
        style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)', lineHeight: 0.95 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, delay: 0.15 }}
          className={(light ? "text-fog" : "text-fog") + " max-w-2xl text-base md:text-lg leading-relaxed"}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
