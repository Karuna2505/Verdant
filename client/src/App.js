import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Plants, Pots } from "./collections";
import { Home, Gifting, Blog } from "./pages";
import Detailed from "./pages/Detailed";
import { getPlants, getPots } from "./api";

function App() {
  const [plants, setPlants] = useState([]);
  const [pots, setPots] = useState([]);

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
      <Navbar />
      <main className="mt-[4.7rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/plants" element={<Plants />} />
          <Route path="/collections/pots" element={<Pots />} />
          <Route path="/pages/gifting" element={<Gifting />} />
          <Route path="/pages/blog" element={<Blog />} />
          <Route path="/collections/plants/:name" element={<Detailed items={plants} type="plant" />} />
          <Route path="/collections/pots/:name" element={<Detailed items={pots} type="pot" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
