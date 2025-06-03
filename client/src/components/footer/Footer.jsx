import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-900 to-red-600 text-white h-20 px-4 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between shadow-lg">
      <p className="font-semibold text-sm md:text-base mb-4 md:mb-0">Sahil Gaonkar</p>
      <div className="flex flex-row text-xl md:text-3xl gap-5 md:gap-7">
        <a
          href="https://github.com/Sahil-clould"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-all duration-200"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/sahilgaonkar/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-all duration-200"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="/"
          className="hover:text-gray-300 transition-all duration-200"
        >
          <FaGooglePlusG />
        </a>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-all duration-200"
        >
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
