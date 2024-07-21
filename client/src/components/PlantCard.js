import React from 'react';

const PlantCard = ({name,price,url}) => {
  return (
    <div className='flex flex-col items-start  rounded-2xl overflow-hidden gap-2'>
    <div className='overflow-hidden '>
      <img src={url} alt={name} className='w-52 h-56 transition-transform duration-300 ease-in-out hover:scale-105'/>
    </div>  
      <p className='font-bold'>{name}</p>
      <h1 className='text-base'>Rs.{price}</h1>
      <button className='w-full h-auto bg-[#357b57] text-white rounded-b-2xl text-sm font-medium py-3 hover:text-[0.9rem]'>VIEW PRODUCT</button>
    </div>
  )
}

export default PlantCard
