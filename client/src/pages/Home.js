import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import plant from "../assets/plant.jpg";
import background from "../assets/background.png";
import PlantCard from "../components/PlantCard";
import { getPlants } from '../api';
import { FaTruck } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { Navigation } from 'swiper/modules';

const Home = ({onAddToCart,cartItems}) => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true); // Manage loading state

    useEffect(() => {
        fetchPlants();
    }, []);

    const fetchPlants = async () => {
        try {
            setLoading(true); // Start loading
            const data = await getPlants();
            setPlants(data);
        } catch (error) {
            console.error('Error fetching plants:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="h-auto w-10/12 md:w-full text-[#357b57] main">
                <img src={background} alt="" className="absolute top-0 lg:block hidden hanger" />
                <img src={background} alt="" className="absolute top-0 lg:block hidden right-4 hanger" />
                <div className="flex flex-col items-center mb-28">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mt-20 mb-6 w-full md:w-2/4">Nurturing your space, naturally</h1>
                    <p className="mb-10 w-full md:w-2/4">Welcome to Verdant, your go-to place for all things plants! Whether you're a seasoned gardener or just starting, we offer a wide range of plants to beautify your home and garden. Explore our collection for detailed information, stunning images, and expert care tips. Let us help you bring nature into your life!</p>
                </div>
            </div>
            <div className="w-10/12 text-[#357b57] text-center bg-[#b1c6bb] mx-16 mb-12 md:mx-28 flex flex-col md:flex md:flex-row items-center justify-around md:justify-center gap-6 md:gap-10 rounded-lg overflow-hidden">
                <div className="p-2">
                    <h1 className="text-3xl font-bold pb-5 pt-10">Ready for your best plant experience?</h1>
                    <p>Take the first step towards transforming your space into lush haven of greenery.</p>
                    <p>Browse our exquisite plant collection and let nature's beauty thrive in your home.</p>
                    <Link to="./collections/plants">
                        <button className="bg-[#357b57] text-white px-4 py-2 font-medium rounded-lg m-6 shadow-2xl hover:bg-[#4e8f6c]">Shop Now</button>
                    </Link>
                </div>
                <div className="h-56 w-56 md:h-72 md:w-72  m-8 overflow-hidden rounded-lg">
                    <img src={plant} alt="" className="transition-transform duration-300 ease-in-out hover:scale-105" />
                </div>
            </div>
            <div className="w-10/12 mb-6">
                <h1 className="text-[#357b57] text-2xl font-bold mb-4">Popular Categories</h1>
                <div className="w-full flex justify-center">
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={10}
                        breakpoints={{
                            400: { slidesPerView: 1 },
                            600: { slidesPerView: 2 },
                            700: { slidesPerView: 3 },
                            1000: { slidesPerView: 5 },
                        }}
                    >
                        {loading || plants.length === 0
                            ? Array(5).fill(null).map((_, index) => (
                                <SwiperSlide key={`skeleton-${index}`}>
                                    <div className="flex flex-col items-start">
                                        <Skeleton width={230} height={200} />
                                        <Skeleton width={150} />
                                        <Skeleton width={100} />
                                    </div>
                                </SwiperSlide>
                              ))
                            : plants.map((plant) => (
                                <SwiperSlide key={plant.name}>
                                    <PlantCard
                                        item={plant}
                                        type="plant"
                                        cartItems={cartItems}
                                        onAddToCart={onAddToCart}
                                    />
                                </SwiperSlide>
                              ))}
                    </Swiper>
                </div>
            </div>
            <div className="w-11/12 md:w-10/12 flex-col lg:flex lg:flex-row gap-6 text-[#357b57] my-10">
                <div className="flex md:p-10 p-4 bg-[#b1c6bb] rounded-xl m-4">
                    <FaTruck className="text-6xl m-4" />
                    <div>
                        <h1 className="font-bold">Free Delivery</h1>
                        <p>Free Shipping all over the world for orders above Rs500</p>
                    </div>
                </div>
                <div className="flex md:p-10 p-4 bg-[#b1c6bb] rounded-xl m-4">
                    <MdOutlinePayment className="text-6xl m-4" />
                    <div>
                        <h1 className="font-bold">Safe Payment</h1>
                        <p>With our payment gateway don't worry about your information</p>
                    </div>
                </div>
                <div className="flex md:p-10 p-4 bg-[#b1c6bb] rounded-xl m-4">
                    <FaRegIdCard className="text-6xl m-4" />
                    <div>
                        <h1 className="font-bold">Friendly Services</h1>
                        <p>You have 30-day return guarantee for every single order</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
