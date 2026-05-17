import { Link } from 'react-router-dom'
import PageWrap from '../components/PageWrap.jsx'

export default function NotFound() {
  return (
    <PageWrap>
      <section className="min-h-[70vh] bg-ink grain flex items-center">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-display text-brass" style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', lineHeight: 1 }}>
            404
          </div>
          <h1 className="font-display text-bone text-3xl md:text-5xl mt-4">Chair not found.</h1>
          <p className="text-fog mt-4">The page you were after doesn't exist. Walk back to the shop entrance.</p>
          <Link to="/" className="btn btn-brass btn-shine mt-8">← Back to shop</Link>
        </div>
      </section>
    </PageWrap>
  )
}
