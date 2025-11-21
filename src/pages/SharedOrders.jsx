import { useEffect, useMemo, useState } from 'react'

function Progress({ current, min }) {
  const pct = Math.min(100, Math.round((current / min) * 100))
  return (
    <div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-fuchsia-500 to-sky-400" style={{ width: pct + '%' }} />
      </div>
      <div className="mt-2 text-xs text-white/70">{pct}% complete</div>
    </div>
  )
}

export default function SharedOrdersPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/shared-orders`).then(r=>r.json()).then(d=>setOrders(d.items||[]))
    fetch(`${baseUrl}/api/products`).then(r=>r.json()).then(d=>setProducts(d.items||[]))
  }, [])

  const byId = useMemo(() => Object.fromEntries(products.map(p=>[p.id, p])), [products])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-white text-3xl font-semibold tracking-tight">Shared Orders</h1>
        <p className="text-white/60 mt-2">Join forces with others to meet minimum order quantities.</p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(o => {
            const p = byId[o.product_id] || {}
            const left = Math.max(0, (o.min_qty||0) - (o.pledged_qty||0))
            const eta = new Date(o.deadline)
            const timeLeft = Math.max(0, eta.getTime() - Date.now())
            const days = Math.floor(timeLeft / (1000*60*60*24))
            const hours = Math.floor((timeLeft / (1000*60*60)) % 24)
            return (
              <div key={o.id} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="text-white font-medium">{p.title || 'Product'}</div>
                <div className="text-white/60 text-sm">MOQ: {o.min_qty}</div>
                <div className="mt-3"><Progress current={o.pledged_qty||0} min={o.min_qty||1} /></div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-white/70">
                  <div><span className="text-white">{left}</span> units left</div>
                  <div><span className="text-white">{o.pledged_qty}</span> pledged</div>
                  <div>ETA: <span className="text-white">{days}d {hours}h</span></div>
                </div>
                <button className="mt-4 w-full px-4 py-2 rounded-lg bg-white text-slate-900 font-medium">Join order</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
