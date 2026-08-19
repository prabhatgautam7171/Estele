import React from 'react'
import SaleBar from './Salebar'
import Hero from './Hero'
import CategorySection from './Category'
import RoseGoldCollection from './RoseGoldCollection'
import ProductCollection from './ProductCollection'
import ShopByCollection from './ShopByCollection'
import BudgetSection from './BudgetSection'
import CelebritySection from './CelebritySection'
import StoreSection from './StoreSection'
import CustomerReviews from './Reviews'
import FeaturesSection from './Features'
import Newsletter from './NewsLetter'
import Footer from './Footer'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <SaleBar />
      <Navbar />

      <main>
        <Hero />
        <CategorySection />
        <RoseGoldCollection />
        <ProductCollection />
        <ShopByCollection />
        <BudgetSection />
        <CelebritySection />
        <StoreSection />
        <CustomerReviews />
        <FeaturesSection />
        <Newsletter />
        <Footer />
      </main>
    </div>
  )
}

export default Home;
