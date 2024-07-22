import React,{ useState,useEffect } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Plants,Pots } from "./collections";
import { Home,Gifting,Blog } from "./pages";
import Detailed from "./pages/Detailed";
import { getPlants } from "./api";

function App() {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    fetchPlants();
}, []);

const fetchPlants = async () => {
    try {
        const data = await getPlants();
        setPlants(data);
    } catch (error) {
        console.error('Error fetching plants:', error);
    }
};
  return (
   <BrowserRouter>
    <Navbar />
    <main className="mt-[4.7rem]">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/collections/plants" element={<Plants />} />
        <Route path="/collections/pots" element={<Pots />} />
        <Route path="/pages/gifting" element={<Gifting />} />
        <Route path="/pages/blog" element={<Blog />} />
        <Route path="/collections/plants/:id" element={<Detailed plants={plants}/>} />
      </Routes>

    </main>
    <Footer />
   </BrowserRouter>
  );
}

export default App;
