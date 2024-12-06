import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch, CiMenuFries } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDivOpen, setIsUserDivOpen] = useState(false);
  const [username, setUsername] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:5000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Make sure the token is retrieved from localStorage
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsername(data.username); // Assuming the API response contains the username
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [isLoggedIn]);

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

  const toggleUser = () => {
    setIsUserDivOpen(!isUserDivOpen);
  };

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
                <Link to="/collections/plants" className="h-5 w-8">
                  <p className="hover:font-bold">Plants</p>
                </Link>
                <Link to="/collections/pots" className="h-5 w-8">
                  <p className="hover:font-bold">Pots</p>
                </Link>
                <Link to="/pages/gifting" className="h-5 w-8">
                  <p className="hover:font-bold">Gifting</p>
                </Link>
                <Link to="/pages/blog" className="h-5 w-8">
                  <p className="hover:font-bold">Blogs</p>
                </Link>
              </div>
              <div className="flex items-center relative">
                <input
                  className="bg-white text-[#397b57] text-sm rounded-3xl focus:outline-none py-2 pl-2 pr-8 placeholder:text-sm"
                  placeholder="Search for plants, seeds, and pots"
                />
                <CiSearch className="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-20 text-[#397b57] cursor-pointer" />
                <Link to="/pages/cart">
                  <FaCartShopping className="h-6 w-6 ml-4 cursor-pointer" />
                </Link>
                {isLoggedIn ? (
                  <>
                    <div className="">
                      <MdAccountCircle
                        className="ml-2 h-7 w-7 cursor-pointer"
                        onClick={toggleUser}
                      />
                      {isUserDivOpen ? (
                        <div className="fixed bg-black">
                          <div className="rounded-full bg-white h-7 w-7">User</div>
                          <h1>Welcome {username}!</h1>
                          <button onClick={handleLogout}>Logout</button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <Link to="/pages/login">
                    <MdAccountCircle className="h-7 w-7 cursor-pointer" />
                  </Link>
                )}
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
                    <Link to="/pages/cart" className="hover:font-semibold py-2">
                      Cart
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex gap-4">
                  {isLoggedIn ? (
                    <MdAccountCircle className="h-7 w-7 cursor-pointer" />
                  ) : (
                    <Link to="/pages/login">
                      <MdAccountCircle className="h-7 w-7 cursor-pointer" />
                    </Link>
                  )}

                  <CiMenuFries className="h-6 w-6 cursor-pointer mt-1" onClick={toggleMenu} />
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
