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
    <div className="">
      <div className="nav h-auto w-full fixed flex justify-between text-[#397b57] bg-[#b1c6bb] md:text-white md:bg-[#397b57] px-6 md:px-10 py-4 lg:px-20">
        <div className="flex">
          <img
            src={windowWidth > 768 ? "/icon.png" : "/icon-green.png"}
            alt="icon"
            className="h-6 w-6"
          />
          <Link to="/">
            <h1 className="text-2xl font-semibold">Verdant</h1>
          </Link>
        </div>
        <div className="gap-8 lg:gap-32 md:gap-12 flex">
          {windowWidth > 768 ? (
            <>
              {" "}
              <div className="flex gap-12 md:gap-8 lg:gap-12 text-xs pt-3 justify-center">
                <Link to="/collections/plants" className="hover:scale-105">
                  PLANTS
                </Link>
                <Link to="/collections/pots" className="hover:scale-105">
                  POTS
                </Link>
                <Link to="/pages/gifting" className="hover:scale-105">
                  GIFTING
                </Link>
                <Link to="/pages/blog" className="hover:scale-105">
                  BLOG
                </Link>
              </div>
              <div className="flex justify-end relative pt-1">
                <input
                  className="bg-white text-[#397b57] text-xs rounded-3xl focus:outline-none py-2 pl-2 pr-0 sm:pr-8 h-6 placeholder:text-xs"
                  placeholder="Search for plants,seeds and pots"
                />
                <CiSearch className="h-7 w-7 absolute top-0 right-14 text-[#397b57] p-1 cursor-pointer" />
                <FaCartShopping className="h-5 w-5 mx-4 pt-1" />
              </div>
            </>
          ) : (
            <>
              {isMenuOpen ? (
                <>
                  <IoIosClose className="h-8 w-8" onClick={toggleMenu} />
                  <div className="fixed flex gap-8 flex-col justify-end bg-[#397b57] text-white top-16 w-max h-max right-0 p-6 rounded-l-2xl">
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
      <div className="bg-[#b1c6bb] flex justify-center">
        {windowWidth < 768 && (
          <>
            <input
              className="bg-white text-black text-xs rounded-3xl border border-[#397b57] py-2 pl-2 h-8 placeholder:text-xs w-11/12 mb-3"
              placeholder="Search for plants,seeds and pots"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
