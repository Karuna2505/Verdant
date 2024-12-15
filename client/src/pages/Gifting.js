import React, { useState, useEffect } from 'react';
import { FaTruck, FaGifts } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { getPlants } from '../api';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import PlantCard from '../components/PlantCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Gifting = ({onAddToCart,cartItems}) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getPlants();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched (or failed)
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="text-center flex flex-col items-center">
      <img src="/image.png" alt="Gifting" className="w-full mb-6" />
      <div className="w-full flex flex-col md:flex-row justify-evenly text-[#357b57]">
        {[
          { icon: <FaTruck className="text-6xl m-2" />, label: 'Quick Delivery' },
          { icon: <FaGifts className="text-6xl m-2" />, label: 'Customizable' },
          { icon: <FaLocationDot className="text-6xl m-2" />, label: 'Pan India' },
        ].map((item, index) => (
          <div key={index} className="border-2 rounded-lg border-[#357b57] m-6 py-[2%] px-[9%] flex flex-col items-center">
            {item.icon}
            <h1 className="text-lg font-semibold">{item.label}</h1>
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-semibold text-[#357b57] my-4">BestSellers</h1>
      <div className="w-10/12 mb-6">
        <div className="w-full flex justify-center">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            breakpoints={{
              400: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              700: {
                slidesPerView: 3,
              },
              1000: {
                slidesPerView: 5,
              }
            }}
          >
            {loading || plants.length===0
              ? [...Array(5)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <Skeleton height={240} width={200} />
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
    </div>
  );
};

export default Gifting;
