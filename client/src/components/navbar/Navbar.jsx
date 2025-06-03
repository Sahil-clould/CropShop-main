import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { SiSellfy } from "react-icons/si";
import { notify } from "../../utils/helper/notification";
import Cart from "../../pages/cart";
import { useCookies } from "react-cookie";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([
    "user_access_token",
    "seller_access_token",
    "brandName",
  ]);

  const userDropdownRef = useRef();
  const sellerDropdownRef = useRef();

  const [openCart, setOpenCart] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSellerDropdown, setShowSellerDropdown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }

      if (
        sellerDropdownRef.current &&
        !sellerDropdownRef.current.contains(event.target)
      ) {
        setShowSellerDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="bg-white border-gray-200 shadow-md fixed top-0 w-full z-50">
        <div className="flex flex-wrap items-center justify-between mx-auto px-6 md:px-12 py-3">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center text-2xl font-semibold text-gray-800"
          >
            <span className="text-red-500 font-bold">C</span>rop
            <span className="text-red-500 font-bold">S</span>hop
          </a>

          {/* Icons Section */}
          <div className="flex flex-row gap-6 md:gap-8 text-2xl md:text-3xl">
            {/* User Dropdown */}
            <div
              ref={userDropdownRef}
              className="relative flex items-center gap-1 text-blue-700 cursor-pointer"
              onMouseEnter={() => {
                setShowUserDropdown(true);
                setShowSellerDropdown(false);
              }}
              onClick={() => {
                if (!cookies.user_access_token) navigate("/account/user");
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <FaUserCircle />
              </motion.div>
              <span className="text-sm font-medium hidden md:block">User</span>

              <AnimatePresence>
                {cookies.user_access_token && showUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-10 right-0 bg-white rounded-lg shadow-lg py-2 w-36"
                  >
                    <ul className="text-sm text-gray-700">
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer transition duration-200"
                        onClick={() => {
                          setCookie("user_access_token", "", {
                            expires: new Date(0),
                          });
                          notify("User Logged Out", "info");
                          navigate("/");
                        }}
                      >
                        Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Seller Dropdown */}
            <div
              ref={sellerDropdownRef}
              className="relative flex items-center gap-1 text-green-700 cursor-pointer"
              onMouseEnter={() => {
                setShowSellerDropdown(true);
                setShowUserDropdown(false);
              }}
              onClick={() => {
                if (!cookies.seller_access_token) navigate("/account/seller");
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <SiSellfy />
              </motion.div>
              <span className="text-sm font-medium hidden md:block">
                Seller
              </span>

              <AnimatePresence>
                {cookies.seller_access_token && showSellerDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-10 right-0 bg-white rounded-lg shadow-lg py-2 w-36"
                  >
                    <ul className="text-sm text-gray-700">
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer transition duration-200"
                        onClick={() => navigate("/sellerdashboard")}
                      >
                        Dashboard
                      </li>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer transition duration-200"
                        onClick={() => {
                          setCookie("seller_access_token", "", {
                            expires: new Date(0),
                          });
                          setCookie("brandName", "", { expires: new Date(0) });
                          notify("Seller Logged Out", "info");
                          navigate("/");
                        }}
                      >
                        Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <div
              className="flex items-center gap-1 text-red-700 cursor-pointer relative"
              onClick={() => setOpenCart(true)}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <AiOutlineShoppingCart />
              </motion.div>
              <span className="text-sm font-medium hidden md:block">Cart</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Push content down to avoid being overlapped by the sticky navbar */}
      <div className="pt-16"></div>

      {/* Cart Modal */}
      <AnimatePresence>
        {openCart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <Cart setOpenCart={setOpenCart} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
