import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate hook
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Plants, Pots } from "./collections";
import { Home, Gifting, Blog, Login, Signup } from "./pages";
import Detailed from "./pages/Detailed";
import { getPlants, getPots } from "./api";
import Cart from "./components/Cart";
import axios from "axios";

function App() {
  const [plants, setPlants] = useState([]);
  const [pots, setPots] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // State for storing username
  const API_URL =
    process.env.NODE_ENV === "development"
      ? 'http://localhost:5000' // Local backend
      : process.env.REACT_APP_API_BASE_URL; // Deployed backend

  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);

        try {
          // Await the response from the '/api/me' route
          const response = await axios.get(`${API_URL}/api/me`, {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in Authorization header
            },
          });

          // Update the user state with data from /api/me
          setUsername(response.data.username); // Assuming username is a string
          console.log(response.data); // Log the user data
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData(); // Call the async function to fetch user data
  }, [username]); // Empty dependency array means this will run once when the component mounts

  // Handle login - now accepts username
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem("authToken", user.token); // Store auth token
    setUsername(user.username); // Update the username after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(""); // Clear the username on logout
    localStorage.removeItem("authToken");
    navigate("/pages/login");
  };

  const handleCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  useEffect(() => {
    fetchPlants();
    fetchPots();
  }, []);

  const fetchPlants = async () => {
    try {
      const data = await getPlants();
      setPlants(data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const fetchPots = async () => {
    try {
      const data = await getPots();
      setPots(data);
    } catch (error) {
      console.error("Error fetching pots:", error);
    }
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username} // Pass username to Navbar
        handleLogout={handleLogout}
      />
      <main className="mt-[4.7rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/plants" element={<Plants />} />
          <Route path="/collections/pots" element={<Pots />} />
          <Route path="/pages/gifting" element={<Gifting />} />
          <Route path="/pages/blog" element={<Blog />} />
          <Route path="/pages/cart" element={<Cart cartItems={cart} />} />
          <Route
            path="/pages/login"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/pages/signup"
            element={<Signup handleLogin={handleLogin} />}
          />
          <Route
            path="/collections/plants/:name"
            element={<Detailed items={plants} type="plant" onAddToCart={handleCart} />}
          />
          <Route
            path="/collections/pots/:name"
            element={<Detailed items={pots} type="pot" onAddToCart={handleCart} />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
