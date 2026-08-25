import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/WishList'


function App() {


  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:slug" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist/>} />       
        </Route>
      </Routes>
    </>
  )
}
export default App
