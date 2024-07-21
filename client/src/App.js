import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Plants,Pots } from "./collections";
import { Home,Gifting,Blog } from "./pages";

function App() {
  return (
   <BrowserRouter>
    <Navbar />
    <main className="mt-16">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/collections/plants" element={<Plants />} />
        <Route path="/collections/pots" element={<Pots />} />
        <Route path="/pages/gifting" element={<Gifting />} />
        <Route path="/pages/blog" element={<Blog />} />
      </Routes>

    </main>
    <Footer />
   </BrowserRouter>
  );
}

export default App;
