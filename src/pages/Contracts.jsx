import { useState } from 'react'

export default function ContractsPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ company_name: '', contact_email: '', phone: '', details: '', estimated_monthly_volume: '', categories: '' })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    const payload = {
      company_name: form.company_name,
      contact_email: form.contact_email,
      phone: form.phone || undefined,
      details: form.details,
      estimated_monthly_volume: form.estimated_monthly_volume ? Number(form.estimated_monthly_volume) : undefined,
      categories: form.categories ? form.categories.split(',').map(s => s.trim()).filter(Boolean) : []
    }
    try {
      const res = await fetch(`${baseUrl}/api/contracts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (res.ok) setStatus(`Request received. Reference: ${data.id}`)
      else setStatus(data.detail || 'Failed to submit')
    } catch (e) {
      setStatus('Network error')
    }
  }

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-white text-3xl font-semibold tracking-tight">Contracts & Companies</h1>
        <p className="text-white/60 mt-2">Submit a request for bulk, recurring supply contracts.</p>

        <form onSubmit={submit} className="mt-8 grid gap-4">
          <input value={form.company_name} onChange={update('company_name')} required placeholder="Company name" className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50"/>
          <input value={form.contact_email} onChange={update('contact_email')} required placeholder="Contact email" type="email" className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50"/>
          <input value={form.phone} onChange={update('phone')} placeholder="Phone (optional)" className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50"/>
          <textarea value={form.details} onChange={update('details')} required placeholder="Describe your requirements, certifications, delivery terms" rows={5} className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50"/>
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={form.estimated_monthly_volume} onChange={update('estimated_monthly_volume')} placeholder="Est. monthly volume (units)" className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50"/>
            <input value={form.categories} onChange={update('categories')} placeholder="Categories (comma separated)" className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50"/>
          </div>
          <button className="mt-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-medium">Submit request</button>
          {status && <div className="text-white/80 text-sm">{status}</div>}
        </form>
      </div>
    </div>
  )
}
