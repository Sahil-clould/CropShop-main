import React from "react";
import useProgressiveImg from "../../hooks/image/useProgressiveImg";

const SideImage = ({ type }) => {
  const [src, { blur }] = useProgressiveImg(
    "/images/auth-banner/auth-compressed.webp",
    "/images/auth-banner/auth.webp"
  );

  return (
    <div className="relative w-full md:w-1/2 h-64 md:h-screen overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-in-out"
        style={{
          filter: blur ? "blur(15px)" : "none",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Soft Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>

      {/* Elegant, Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 md:px-14 z-20">
        <p className="text-white text-2xl md:text-4xl font-semibold leading-relaxed drop-shadow-md">
          {type === "seller"
            ? "Cultivate Success, Grow with CropShop"
            : "Nature’s Best, Just for You"}
        </p>
        <p className="text-gray-300 text-md md:text-xl font-normal mt-4 md:mt-6 leading-relaxed">
          {type === "seller"
            ? "Join a thriving marketplace designed for passionate farmers and sellers."
            : "Discover farm-fresh, organic delights straight from nature’s heart."}
        </p>
      </div>
    </div>
  );
};

export default SideImage;
