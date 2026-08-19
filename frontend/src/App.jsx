import BudgetSection from "./components/BudgetSection";
import CategorySection from "./components/Category";
import CelebritySection from "./components/CelebritySection";
import FeaturesSection from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Newsletter from "./components/NewsLetter";
import ProductCollection from "./components/ProductCollection";
import CustomerReviews from "./components/Reviews";
import RoseGoldCollection from "./components/RoseGoldCollection";
import SaleBar from "./components/Salebar";
import ShopByCollection from "./components/ShopByCollection";
import StoreSection from "./components/StoreSection";

function App() {
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
        <StoreSection/>
        <CustomerReviews />
        <FeaturesSection />
        <Newsletter/>
        <Footer/>
      </main>
    </div>
  );
}

export default App;
