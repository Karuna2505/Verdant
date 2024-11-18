import React from 'react';
import { Link } from 'react-router-dom';

const PlantCard = ({ name, url, price, type }) => {
  const linkPath = type === "plant" ? `/collections/plants/${name}` : `/collections/pots/${name}`;
  return (
    <div className='flex flex-col items-start rounded-2xl overflow-hidden gap-2'>
      <Link to={linkPath} className='overflow-hidden'>
        <img src={url} alt={name} className='w-[21rem] md:w-60 h-64 transition-transform duration-300 ease-in-out hover:scale-105' />
      </Link>
      <p className='font-bold'>{name}</p>
      <h1 className='text-base'>Rs.{price}</h1>
      <Link to={linkPath} className='md:w-60 w-[21rem] h-auto bg-[#357b57] text-white rounded-b-2xl text-sm font-medium py-3 hover:text-[0.9rem] text-center'>VIEW PRODUCT</Link>
    </div>
  );
}

export default PlantCard;
