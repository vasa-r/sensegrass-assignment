import React from "react";
import NavBar from "../components/LandingComponents/NavBar";
import HeroSection from "../components/LandingComponents/HeroSection";
import Product from "../components/LandingComponents/Product";
import Companies from "../components/LandingComponents/Companies";
import Visualize from "../components/LandingComponents/Visualize";
import Reviews from "../components/LandingComponents/Reviews";
import Pricing from "../components/LandingComponents/Pricing";
import Benefacts from "../components/LandingComponents/Benefacts";
import Footer from "../components/LandingComponents/Footer";

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
