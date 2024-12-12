import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch, CiMenuFries } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ username, isLoggedIn, handleLogout }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDivOpen, setIsUserDivOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
  
      // Optionally close the menu when resizing to a larger screen
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
  
    window.addEventListener("resize", handleResize);
  
    // Prevent scrolling when the menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUser = () => setIsUserDivOpen(!isUserDivOpen);

  const handleClickOutside = (e) => {
    if (isMenuOpen && !e.target.closest(".menu")) {
      setIsMenuOpen(false);
    }
    if (isUserDivOpen && !e.target.closest(".user-menu")) {
      setIsUserDivOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen, isUserDivOpen]);

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="nav h-auto w-full fixed flex justify-between items-center text-white bg-[#397b57] px-6 md:px-10 py-5 lg:px-20">
        <div className="flex items-center">
          <img src="/icon.png" alt="icon" className="h-6 w-6 mr-2" />
          <Link to="/">
            <h1 className="text-3xl font-semibold">Verdant</h1>
          </Link>
        </div>
        <div className="flex items-center gap-8 lg:gap-32 md:gap-12">
          {windowWidth > 768 ? (
            <>
              <div className="flex gap-12 md:gap-8 lg:gap-12 text-base font-normal">
                <Link to="/collections/plants">
                  <p className="hover:font-bold">Plants</p>
                </Link>
                <Link to="/collections/pots">
                  <p className="hover:font-bold">Pots</p>
                </Link>
                <Link to="/pages/gifting">
                  <p className="hover:font-bold">Gifting</p>
                </Link>
                <Link to="/pages/blog">
                  <p className="hover:font-bold">Blogs</p>
                </Link>
              </div>
              <div className="flex items-center relative">
                <input
                  className="bg-white text-[#397b57] text-sm rounded-3xl focus:outline-none py-2 pl-4 pr-10 placeholder:text-sm"
                  placeholder="Search for plants and pots"
                  onChange={(e) => console.log(e.target.value)} // Handle search input
                />
                <CiSearch className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-[87px] text-[#397b57] cursor-pointer" />
                <Link to="/pages/cart">
                  <FaCartShopping className="h-6 w-6 ml-4 cursor-pointer" />
                </Link>
                {isLoggedIn ? (
                  <div className="user-menu">
                    <MdAccountCircle
                      className="ml-2 h-7 w-7 cursor-pointer"
                      onClick={toggleUser}
                    />
                    {isUserDivOpen && (
                      <div className="absolute bg-white shadow-md rounded-lg p-4 user-menu top-10 right-0 z-50">
                        <p className="text-black mb-2">Welcome, {username}!</p>
                        <button
                          className="text-white bg-[#357b57] px-4 py-2 rounded hover:bg-[#22563b] transition"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/pages/login">
                    <MdAccountCircle className="ml-2 h-7 w-7 cursor-pointer" />
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              {isMenuOpen ? (
                <div className="menu">
                  <IoIosClose className="h-8 w-8 cursor-pointer"  onClick={(e) => {
        e.stopPropagation(); // Prevent handleClickOutside from running
        toggleMenu();
      }} />
                  <div className="fixed flex flex-col items-center bg-[#397b57] text-white top-16 w-full h-max right-0 py-2 text-lg z-50 menu">
                    <Link to="/collections/plants" className="hover:font-semibold py-2" onClick={closeMenu}>
                      Plants
                    </Link>
                    <Link to="/collections/pots" className="hover:font-semibold py-2" onClick={closeMenu}>
                      Pots
                    </Link>
                    <Link to="/pages/gifting" className="hover:font-semibold py-2" onClick={closeMenu}>
                      Gifting
                    </Link>
                    <Link to="/pages/blog" className="hover:font-semibold py-2" onClick={closeMenu}>
                      Blog
                    </Link>
                    <Link to="/pages/cart" className="hover:font-semibold py-2" onClick={closeMenu}>
                      Cart
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  {isLoggedIn ? (
                    <div className="user-menu">
                      <MdAccountCircle
                        className="ml-2 h-7 w-7 cursor-pointer"
                        onClick={toggleUser}
                      />
                      {isUserDivOpen && (
                        <div className="absolute bg-white shadow-md rounded-lg p-4 user-menu top-14 right-6 z-50">
                          <p className="text-black mb-2">Welcome, {username}!</p>
                          <button
                            className="text-white bg-[#357b57] px-4 py-2 rounded hover:bg-[#22563b] transition"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/pages/login">
                      <MdAccountCircle className="ml-2 h-7 w-7 cursor-pointer" />
                    </Link>
                  )}

                  <CiMenuFries className="h-6 w-6 cursor-pointer mt-1"  onClick={(e) => {
        e.stopPropagation(); // Prevent handleClickOutside from running
        toggleMenu();
      }} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
