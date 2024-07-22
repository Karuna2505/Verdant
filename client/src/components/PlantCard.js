import React from 'react';
import { Link } from 'react-router-dom';

const PlantCard = ({plant}) => {
  return (
    <div className='flex flex-col items-start  rounded-2xl overflow-hidden gap-2'>
    <Link to={`/collections/plants/${plant.id}`} className='overflow-hidden'>
      <img src={plant.image_url} alt={plant.name} className='w-60 h-64 transition-transform duration-300 ease-in-out hover:scale-105'/>
    </Link>  
      <p className='font-bold'>{plant.name}</p>
      <h1 className='text-base'>Rs.{plant.price}</h1>
      <button className='w-full h-auto bg-[#357b57] text-white rounded-b-2xl text-sm font-medium py-3 hover:text-[0.9rem]'>VIEW PRODUCT</button>
    </div>
  )
}

export default PlantCard
