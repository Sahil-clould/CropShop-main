import React from "react";
import { motion } from "framer-motion";
import useProgressiveImg from "../../hooks/image/useProgressiveImg";

function CategoryCard(props) {
  const [src, { blur }] = useProgressiveImg(props.compressedImg, props.image);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
    >
      <img
        src={src}
        loading="lazy"
        className={`w-full h-28 md:h-52 transition-all duration-500 ${
          blur ? "blur" : "blur-none"
        }`}
      />
      {/* Dark Overlay */}
      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-black bg-opacity-40 transition-opacity duration-500"></div>

      {/* Title with hover effect */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 w-full p-4 text-white text-base md:text-lg font-semibold md:font-bold bg-gradient-to-t from-black to-transparent"
      >
        {props.title}
      </motion.div>

      {/* Hover Effect */}
      <motion.div
        whileHover={{ opacity: 0.1 }}
        className="absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-white bg-opacity-10 opacity-0 transition duration-300"
      ></motion.div>
    </motion.div>  
  );
}


export default CategoryCard;
