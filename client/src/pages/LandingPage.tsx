import NavBar from "../components/landing/NavBar";
import HeroSection from "../components/landing/HeroSection";
import Product from "../components/landing/Product";
import Companies from "../components/landing/Companies";
import Visualize from "../components/landing/Visualize";
import Reviews from "../components/landing/Reviews";
import Pricing from "../components/landing/Pricing";
import Benefacts from "../components/landing/Benefacts";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="w-screen h-screen pb-8 px-5 md:px-[6%] overflow-y-auto scroll-smooth">
      <NavBar />
      <main className="flex flex-col items-center gap-6 md:gap-24">
        <HeroSection />
        <Product />
        <Companies />
        <Visualize />
        <Reviews />
        <Pricing />
        <Benefacts />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
