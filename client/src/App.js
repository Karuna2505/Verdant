import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Plants, Pots } from "./collections";
import { Home, Gifting, Blog ,Login,Signup } from "./pages";
import Detailed from "./pages/Detailed";
import { getPlants, getPots } from "./api";
import Cart from "./components/Cart";

function App() {
  const [plants, setPlants] = useState([]);
  const [pots, setPots] = useState([]);
  const [cart,setCart]=useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Simulate successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Log out the user
    setIsLoggedIn(false);
  };

  const handleCart=(product)=>{
     setCart((prevCart)=>[...prevCart,product])
  }

  useEffect(() => {
    fetchPlants();
    fetchPots();
  }, []);

  const fetchPlants = async () => {
    try {
      const data = await getPlants();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  const fetchPots = async () => {
    try {
      const data = await getPots();
      setPots(data);
    } catch (error) {
      console.error('Error fetching pots:', error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn}/>
      <main className="mt-[4.7rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/plants" element={<Plants />} />
          <Route path="/collections/pots" element={<Pots />} />
          <Route path="/pages/gifting" element={<Gifting />} />
          <Route path="/pages/blog" element={<Blog />} />
          <Route path="/pages/cart" element={<Cart cartItems={cart}/>} />
          <Route path="/pages/login" element={<Login handleLogin={handleLogin}/>} />
          <Route path="/pages/signup" element={<Signup handleLogin={handleLogin}/>} />
          <Route path="/collections/plants/:name" element={<Detailed items={plants} type="plant" onAddToCart={handleCart}/>} />
          <Route path="/collections/pots/:name" element={<Detailed items={pots} type="pot" onAddToCart={handleCart}/>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
