import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch, CiMenuFries } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="nav h-auto w-full fixed flex justify-between items-center text-[#397b57] bg-[#b1c6bb] md:text-white md:bg-[#397b57] px-6 md:px-10 py-5 lg:px-20">
        <div className="flex items-center">
          <img
            src={windowWidth > 768 ? "/icon.png" : "/icon-green.png"}
            alt="icon"
            className="h-6 w-6 mr-2"
          />
          <Link to="/">
            <h1 className="text-3xl font-semibold">Verdant</h1>
          </Link>
        </div>
        <div className="flex items-center gap-8 lg:gap-32 md:gap-12">
          {windowWidth > 768 ? (
            <>
              <div className="flex gap-12 md:gap-8 lg:gap-12 text-sm font-normal">
                <Link to="/collections/plants" className="hover:scale-110">
                  PLANTS
                </Link>
                <Link to="/collections/pots" className="hover:scale-110">
                  POTS
                </Link>
                <Link to="/pages/gifting" className="hover:scale-110">
                  GIFTING
                </Link>
                <Link to="/pages/blog" className="hover:scale-110">
                  BLOG
                </Link>
              </div>
              <div className="flex items-center relative">
                <input
                  className="bg-white text-[#397b57] text-sm rounded-3xl focus:outline-none py-2 pl-2 pr-8 placeholder:text-sm"
                  placeholder="Search for plants, seeds, and pots"
                />
                <CiSearch className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-12 text-[#397b57] cursor-pointer" />
                <FaCartShopping className="h-6 w-6 ml-4 cursor-pointer" />
              </div>
            </>
          ) : (
            <>
              {isMenuOpen ? (
                <>
                  <IoIosClose className="h-8 w-8 cursor-pointer" onClick={toggleMenu} />
                  <div className="fixed flex flex-col items-center bg-[#397b57] text-white top-16 w-full h-max right-0 py-2 text-lg z-50">
                    <Link to="/collections/plants" className="hover:font-semibold py-2">
                      Plants
                    </Link>
                    <Link to="/collections/pots" className="hover:font-semibold py-2">
                      Pots
                    </Link>
                    <Link to="/pages/gifting" className="hover:font-semibold py-2">
                      Gifting
                    </Link>
                    <Link to="/pages/blog" className="hover:font-semibold py-2">
                      Blog
                    </Link>
                    <Link to="/cart" className="hover:font-semibold py-2">
                      Cart
                    </Link>
                  </div>
                </>
              ) : (
                <CiMenuFries className="h-6 w-6 cursor-pointer" onClick={toggleMenu} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
