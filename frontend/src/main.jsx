import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './components/context/CartContext.jsx'
import { WishlistProvider } from './components/context/WishlistContext.jsx'
import AuthProvider, { AuthContext } from './components/context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
    </AuthProvider> 
    </BrowserRouter>
  </StrictMode>,
)
