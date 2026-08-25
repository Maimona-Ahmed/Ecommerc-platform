import React from 'react'
import Navbar from '../components/ui/navbar'
import Hero from '../components/home/hero'
import Categories from '../components/home/Categories'
import FeaturedProducts from '../components/home/FeatruredProducts'
import NewArrivals from '../components/home/NewArrivals'
import PromoBanner from '../components/home/promoBanner'
import Footer from '../components/ui/Footer'


function Home() {
  return (
    <>
    <main>
      <Hero/>
      <Categories/>
      <FeaturedProducts/>
      <NewArrivals/>
      <PromoBanner/>

    </main>
    
    </>

  )
}

export default Home
