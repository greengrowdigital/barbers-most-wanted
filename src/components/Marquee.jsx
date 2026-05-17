export default function Marquee({ text }) {
  const parts = Array(4).fill(text)
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-black/80 py-5">
      <div className="marquee font-display text-bone text-3xl md:text-5xl">
        {parts.map((p, i) => (
          <span key={i} className="flex items-center gap-12 pr-12">
            <span>{p}</span>
            <span className="text-brass">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
