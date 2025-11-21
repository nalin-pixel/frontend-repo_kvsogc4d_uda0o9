import { useEffect, useState } from 'react'

export default function SuppliersShowcase() {
  const [suppliers, setSuppliers] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/suppliers`).then(r => r.json()).then(d => setSuppliers(d.items || [])).catch(()=>{})
  }, [])

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-2xl font-semibold mb-6">Featured factories & suppliers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map(s => (
            <div key={s.id} className="rounded-2xl border border-white/15 bg-white/5 p-5 hover:bg-white/10 transition">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10" style={{backgroundImage: `url(${s.logo_url})`, backgroundSize:'cover'}} />
                <div>
                  <div className="text-white font-medium">{s.name}</div>
                  <div className="text-white/60 text-sm">{s.location}</div>
                </div>
              </div>
              <p className="mt-4 text-white/70 text-sm line-clamp-3">{s.summary}</p>
              {s.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/70">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
