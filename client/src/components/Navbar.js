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
    <div className="fixed top-0">
      <div className="nav h-auto w-full fixed flex justify-between text-[#397b57] bg-[#b1c6bb] md:text-white md:bg-[#397b57] px-6 md:px-10 py-5 lg:px-20">
        <div className="flex">
          <img
            src={windowWidth > 768 ? "/icon.png" : "/icon-green.png"}
            alt="icon"
            className="h-6 w-6"
          />
          <Link to="/">
            <h1 className="text-3xl font-semibold">Verdant</h1>
          </Link>
        </div>
        <div className="gap-8 lg:gap-32 md:gap-12 flex">
          {windowWidth > 768 ? (
            <>
              <div className="flex gap-12 md:gap-8 lg:gap-12 text-sm pt-3 justify-center font-normal">
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
              <div className="flex justify-end md:justify-center md:items-center relative pt-2">
                <input
                  className="bg-white text-[#397b57] text-sm rounded-3xl focus:outline-none py-2 pl-2 pr-0 sm:pr-8 h-6 placeholder:text-sm"
                  placeholder="Search for plants,seeds and pots"
                />
                <CiSearch className="h-6 w-6 absolute top-0 right-14 text-[#397b57] cursor-pointer mt-2" />
                <FaCartShopping className="h-6 w-6 mx-4 pt-1" />
              </div>
            </>
          ) : (
            <>
              {isMenuOpen ? (
                <>
                  <IoIosClose className="h-8 w-8" onClick={toggleMenu} />
                  <div className="fixed flex gap-8 flex-col items-center bg-[#397b57] text-white top-16 w-1/3 h-max right-0 py-2 rounded-l-2xl text-lg">
                    <Link
                      to="/collections/plants"
                      className="hover:font-semibold"
                    >
                      Plants
                    </Link>
                    <Link
                      to="/collections/seeds"
                      className="hover:font-semibold"
                    >
                      Seeds
                    </Link>
                    <Link
                      to="/collections/pots"
                      className="hover:font-semibold"
                    >
                      Pots
                    </Link>
                    <Link to="/pages/gifting" className="hover:font-semibold">
                      Gifting
                    </Link>
                    <Link to="/pages/blog" className="hover:font-semibold">
                      Blog
                    </Link>
                    <Link>Cart</Link>
                  </div>
                </>
              ) : (
                <>
                  <CiMenuFries
                    className="h-6 w-6 my-1 mx-2"
                    onClick={toggleMenu}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Navbar;
