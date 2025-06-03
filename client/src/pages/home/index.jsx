import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Hero from "./Hero";
import Heading from "../../components/heading/Heading";
import Footer from "../../components/Footer"; // Ensure you have a Footer component

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow pt-20"> {/* Adjust spacing from navbar */}
        <Hero />
        <Link to="/products"></Link>
        <div className="mx-auto w-11/12 mb-6 md:mb-12">
          <Heading text="Category" marginY="my-6 md:my-8" textAlign="text-center" />
          <Category />
        </div>
      <br></br></div>

      {/* Footer Stays at Bottom */}
      <Footer className="mt-auto" />
    </div>
  );
}

export default Home;
