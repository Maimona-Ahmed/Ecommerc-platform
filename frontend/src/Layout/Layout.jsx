import React from 'react'
import Navbar from '../components/ui/navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/ui/Footer'

function Layout() {
  return (
    <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    
    </>

  )
}

export default Layout
