export default function HowItWorks() {
  const steps = [
    {
      title: 'Discover',
      desc: 'Browse verified factories and suppliers with transparent pricing and minimums.',
    },
    {
      title: 'Order',
      desc: 'Place direct orders or join shared orders to reach manufacturing minimums together.',
    },
    {
      title: 'Track',
      desc: 'Follow progress, delivery timelines, and communicate in one place.',
    },
  ]

  return (
    <section id="how" className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="text-white/60 text-sm">0{i+1}</div>
              <h3 className="mt-2 text-xl text-white font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
