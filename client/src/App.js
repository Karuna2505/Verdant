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
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [pots, setPots] = useState([]);
  const [cart, setCart] = useState([]);
  const [count,setCount]=useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // State for storing username
  const API_URL =
    process.env.NODE_ENV === "development"
      ? 'http://localhost:5000' // Local backend
      : process.env.REACT_APP_API_BASE_URL; // Deployed backend

  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation
  window.addEventListener("beforeunload", function () {
    localStorage.removeItem("authToken");
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const authtoken = localStorage.getItem("authToken");
      if (authtoken) {
        setIsLoggedIn(true);

        try {
          // Await the response from the '/api/me' route
          const response = await axios.get(`${API_URL}/api/me`, {
            headers: {
              Authorization: `Bearer ${authtoken}`, // Send the token in Authorization header
            },
          });

          // Update the user state with data from /api/me
          setUsername(response.data.username);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };
    fetchUserData();
    fetchCartData(); // Call the async function to fetch user data
  }, [isLoggedIn,cart,count]); // Dependency on isLoggedIn, to fetch user data when login status changes


  const fetchCartData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setCart(response.data.cart); // Set the fetched cart data
      setCount(response.data.cart.quantity)
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  // Handle login - now accepts username
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem("authToken", user.token); // Store auth token
    setUsername(user.username); // Update the username after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(""); // Clear the username on logout
    setCart([]); // Clear the cart on logout
    localStorage.removeItem("authToken");
    navigate("/pages/login");
  };

  const handleAddToCart = async (item, count,type) => {
    try {
      const token = localStorage.getItem("authToken"); // Get the token for the logged-in user
      if (!token) {
        alert("Please log in to add items to the cart");
        return;
      }
      const response = await axios.post(
        `${API_URL}/api/cart/add`, // Endpoint for adding to cart
        {
          type: type,      // Send item type (e.g., "plant" or "pot")
          count: count,    // Send item count (quantity)
          itemId: item._id // Send the item's unique ID (either plantId or potId)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authorization
          },
        }
      );
       
      // Handle successful response
      if (response.data.message) {
        setCart(response.data.cart);
        setCount(response.data.cart.quantity);  
        toast.success('Item added to cart!');
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Something went wrong while adding item to cart");
    }
  };
  
  

  useEffect(() => {
    fetchPlants();
    fetchPots();
  }, []); // Fetch plants and pots data once when the component mounts

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
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={1000} />
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username} // Pass username to Navbar
        handleLogout={handleLogout}
      />
      <main className="mt-[4.7rem]">
        <Routes>
          <Route path="/" element={<Home  onAddToCart={handleAddToCart} cartItems={cart}/>} />
          <Route path="/collections/plants" element={<Plants onAddToCart={handleAddToCart} cartItems={cart}/>} />
          <Route path="/collections/pots" element={<Pots onAddToCart={handleAddToCart} cartItems={cart}/>} />
          <Route path="/pages/gifting" element={<Gifting  onAddToCart={handleAddToCart} cartItems={cart}/>} />
          <Route path="/pages/blog" element={<Blog />} />
          <Route path="/pages/cart" element={<Cart cartItems={cart} count={count}/>} />
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
            element={<Detailed items={plants} type="plant" onAddToCart={handleAddToCart} cartItems={cart}/>}
          />
          <Route
            path="/collections/pots/:name"
            element={<Detailed items={pots} type="pot" onAddToCart={handleAddToCart} cartItems={cart}/>}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
