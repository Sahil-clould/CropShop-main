import React from "react";
import { motion } from "framer-motion";
import useProgressiveImg from "../../hooks/image/useProgressiveImg";
import { Link } from "react-router-dom";

function Hero() {
  const [src, { blur }] = useProgressiveImg(
    "/images/home-banner/home-compressed.webp",
    "/images/home-banner/home.webp"
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }} // Increased duration
      className="relative flex items-center justify-center h-screen w-full bg-gradient-to-r from-rose-200 to-orange-100 overflow-hidden"
    >
      {/* Background Image with Smooth Zoom-in Effect */}
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }} // Increased duration
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2)), url(${src})`,
          filter: blur ? "blur(12px)" : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></motion.div>

      {/* Content Box with Longer Fade-in */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }} // Increased duration & added delay
        className="relative z-10 max-w-screen-lg text-center px-6 lg:px-24"
      >
        <h1 className="text-5xl font-extrabold md:text-7xl text-gray-900 drop-shadow-lg">
          Crop
          <span className="text-rose-700">Shop</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1 }} // Longer duration & delay
          className="mt-4 max-w-lg mx-auto text-gray-700 sm:text-xl sm:leading-relaxed"
        >
          Connecting Farmers and Consumers - Bringing Fresh Produce to Your
          Doorstep!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }} // Longer delay for better effect
          className="mt-6"
        >
          <Link
            to="/account/user"
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-rose-700 to-orange-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            Start here 
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
