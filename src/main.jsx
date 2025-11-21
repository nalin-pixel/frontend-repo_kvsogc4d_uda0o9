import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './App'
import Test from './Test'
import ProductsPage from './pages/Products'
import SharedOrdersPage from './pages/SharedOrders'
import ContractsPage from './pages/Contracts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/shared" element={<SharedOrdersPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
