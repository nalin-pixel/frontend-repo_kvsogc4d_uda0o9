import { useState } from 'react'
import { Menu, X, Factory, ShoppingCart, Handshake, Home } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'
    }`

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-sky-400 shadow-inner" />
              <span className="font-semibold tracking-tight text-white text-lg">SupplyLink</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={linkClasses}>
                <div className="flex items-center gap-2"><Home size={16}/> Home</div>
              </NavLink>
              <NavLink to="/products" className={linkClasses}>
                <div className="flex items-center gap-2"><Factory size={16}/> Products</div>
              </NavLink>
              <NavLink to="/shared" className={linkClasses}>
                <div className="flex items-center gap-2"><ShoppingCart size={16}/> Shared Orders</div>
              </NavLink>
              <NavLink to="/contracts" className={linkClasses}>
                <div className="flex items-center gap-2"><Handshake size={16}/> Contracts</div>
              </NavLink>
            </nav>

            <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 text-white/80">
              {open ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>

          {open && (
            <div className="md:hidden px-4 pb-4">
              <div className="flex flex-col gap-2">
                <NavLink onClick={() => setOpen(false)} to="/" className={linkClasses}>Home</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/products" className={linkClasses}>Products</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/shared" className={linkClasses}>Shared Orders</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/contracts" className={linkClasses}>Contracts</NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
