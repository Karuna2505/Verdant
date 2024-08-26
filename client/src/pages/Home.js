import React from "react";
import { Link } from "react-router-dom";
import plant from "../assets/plant.jpg";
import background from "../assets/background.png";

const Home = () => {
    return (
        <div className="w-full flex flex-col items-center">
        <div className="h-auto w-10/12 md:w-full text-[#357b57] main">
            <img src={background} alt="" className="absolute top-0 lg:block hidden"/>
             <div className="flex flex-col items-center mb-28">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mt-20 mb-6 w-full md:w-2/4">Nurturing your space,naturally</h1>
            <p className="mb-10 w-full md:w-2/4">Welcome to Verdant, your go-to place for all things plants! Whether you're a seasoned gardener or just starting, we offer a wide range of plants to beautify your home and garden. Explore our collection for detailed information, stunning images, and expert care tips. Let us help you bring nature into your life!</p>  
            </div> 
        </div>
        <div className="w-10/12 text-[#357b57] text-center bg-[#b1c6bb] mx-16 mb-16 md:mx-28 flex flex-col  md:flex md:flex-row items-center justify-around md:justify-center gap-6 md:gap-10 rounded-lg overflow-hidden">
            <div className="p-2">
            <h1 className="text-3xl font-bold pb-5 pt-10">Ready for your best plant experience?</h1>
            <p>Take the first step towards tranforming your space into lush haven of greenery.</p>
            <p>Browse our exquisite plant collection and let nature's beauty thrive in your home.</p>
            <Link to="./collections/plants"><button className="bg-[#357b57] text-white px-4 py-2 font-medium rounded-lg m-6 shadow-2xl hover:bg-[#4e8f6c]">Shop Now</button></Link>
            </div>
            <div className="h-56 w-56 md:h-72 md:w-72  m-8 overflow-hidden rounded-lg">
            <img src={plant} alt="" className="transition-transform duration-300 ease-in-out hover:scale-105"/>
            </div>     
        </div>
        </div>
    );
};

export default Home;
