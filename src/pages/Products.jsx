import { useEffect, useMemo, useState } from 'react'

export default function ProductsPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetch(`${baseUrl}/api/suppliers`).then(r=>r.json()).then(d=>setSuppliers(d.items||[]))
    fetch(`${baseUrl}/api/products`).then(r=>r.json()).then(d=>setProducts(d.items||[]))
  }, [])

  const filtered = useMemo(() => {
    return products.filter(p => (
      (!query || p.title.toLowerCase().includes(query.toLowerCase())) &&
      (!category || p.category === category)
    ))
  }, [products, query, category])

  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 justify-between">
          <div>
            <h1 className="text-white text-3xl font-semibold tracking-tight">Products</h1>
            <p className="text-white/60 mt-2">Order directly from suppliers or factories.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products" className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 w-full"/>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white w-full sm:w-56">
              <option value="">All categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="text-white font-medium">{p.title}</div>
              <div className="text-white/60 text-sm">{p.category}</div>
              <div className="mt-3 text-white/70 text-sm line-clamp-3">{p.description}</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/80">
                <div>MOQ: <span className="text-white">{p.min_order_qty}</span></div>
                <div>Total: <span className="text-white">${p.total_price}</span></div>
                <div>Discount: <span className="text-white">{Math.round((p.discount_rate||0)*100)}%</span></div>
                <div>Unit: <span className="text-white">${p.price.toFixed(2)}</span></div>
              </div>
              {p.customization_options?.length>0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.customization_options.map(opt => <span key={opt} className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/70">{opt}</span>)}
                </div>
              )}
              <div className="mt-5 flex gap-2">
                <a href={`#/supplier/${p.supplier_id}`} className="px-4 py-2 rounded-lg bg-white/10 text-white/80 border border-white/15">View supplier</a>
                <button className="px-4 py-2 rounded-lg bg-white text-slate-900 font-medium">Order</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-white/80 mb-4">Suppliers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map(s => (
              <div key={s.id} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="text-white font-medium">{s.name}</div>
                <div className="text-white/60 text-sm">{s.summary}</div>
                <div className="mt-3 text-white/60 text-sm">{s.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
