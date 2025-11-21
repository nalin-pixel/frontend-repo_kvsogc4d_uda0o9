import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AudioIntro from './components/AudioIntro'
import HowItWorks from './components/HowItWorks'
import SuppliersShowcase from './components/SuppliersShowcase'

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <main className="relative z-10">
        <section className="-mt-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h2 className="text-white text-2xl font-semibold">SupplyLink</h2>
              <p className="text-white/70 mt-2">A modern marketplace connecting retailers with factories and suppliers worldwide.</p>
              <AudioIntro />
            </div>
          </div>
        </section>
        <HowItWorks />
        <SuppliersShowcase />
      </main>
    </div>
  )
}

export default Home
