import React,{useState,useEffect} from 'react'
import { FaTruck, FaGifts} from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6"
import { getPlants } from '../api';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import PlantCard from '../components/PlantCard';


const Gifting = () => {
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
    <div className='text-center flex flex-col items-center'>
     <img src='/image.png' alt=""/>
     <div className='w-full flex flex-col md:flex md:flex-row justify-evenly text-[#357b57]'>
       <div className='border-2 rounded-lg border-[#357b57] m-6 py-[2%] px-[9%] flex flex-col items-center'>
          <FaTruck className='text-6xl m-2' />
          <h1 className='text-lg font-semibold'>Quick Delivery</h1>
       </div>
       <div className='border-2 rounded-lg border-[#357b57] m-6 py-[2%] px-[9%] flex flex-col items-center'>
          <FaGifts className='text-6xl m-2' />
          <h1 className='text-lg font-semibold'>Customizable</h1>
       </div>
       <div className='border-2 rounded-lg border-[#357b57] m-6 py-[2%] px-[9%] flex flex-col items-center'>
          <FaLocationDot className='text-6xl m-2' />
          <h1 className='text-lg font-semibold'>Pan India</h1>
       </div>
     </div>
     <h1 className='text-2xl font-semibold text-[#357b57] my-4'>BestSellers</h1>
     <div className='w-10/12 mb-6'>
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
                        {plants.map((plant) => (
                            <SwiperSlide key={plant.name}>
                                <PlantCard
                                    name={plant.name}
                                    url={plant.image_url}
                                    price={plant.price}
                                    type="plant"

                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
                </div>
    </div>
  )
}

export default Gifting
