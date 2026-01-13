import React from "react";
import Hero from "../components/Hero";
import CategoryCarousel from "../components/CategoryCarousel";
import FeaturedProducts from "../components/FeaturedProducts";
import ServiceInfo from "../components/ServiceInfo";
import HomeSmartNudge from "../components/HomeSmartNudge";
import Template from "../components/Template"; // Keeping for variety, or can remove if too cluttered

const Home = () => {
    return (
      <div className="bg-white">
        <Hero />
        <HomeSmartNudge />
        <ServiceInfo />
        <CategoryCarousel />
        <FeaturedProducts />
        <Template />
      </div>
    )
};

export default Home;
