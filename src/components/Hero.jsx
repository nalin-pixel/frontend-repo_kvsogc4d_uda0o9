import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">
        <div className="max-w-3xl">
          <h1 className="text-white text-5xl sm:text-6xl font-semibold tracking-tight leading-tight">
            Connect Retail Stores with World‑Class Factories
          </h1>
          <p className="mt-6 text-white/80 text-lg">
            Order directly from verified suppliers. Collaborate on shared orders to hit minimums. Simple, transparent, and built for scale.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#how" className="px-5 py-3 rounded-xl bg-white text-slate-900 font-medium hover:bg-white/90 transition">How it works</a>
            <a href="/products" className="px-5 py-3 rounded-xl bg-slate-900/70 text-white border border-white/20 hover:bg-slate-900/90 transition">Browse products</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
    </section>
  )
}
