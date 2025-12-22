import React from "react";
import Banner from "../../components/Home/Banner";
import ProductCatalog from "../../components/DynamicProductCatalog/ProductCatalog";
import CompanyStats from "../../components/Home/CompanyStats";
import ServicesSection from "../../components/Home/ServicesSection";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Banner />
      <ProductCatalog />
      <ServicesSection />
      <WhyChooseUs />
    </>
  );
};

export default Home;
