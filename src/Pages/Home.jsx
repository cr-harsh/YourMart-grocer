import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeaturedProducts from "../components/FeaturedProducts";
import Template from "../components/Template";
import ServiceInfo from "../components/ServiceInfo";

const Home = () => {
    return (
  <>
    <Hero />
    <ServiceInfo />
    <Category />
    <FeaturedProducts />
    <Template />
  </>
    )
};

export default Home;
