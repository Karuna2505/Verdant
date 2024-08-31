import React from 'react'


const GardeningBasic = ({title,image_url,description}) => {
  return (
    <div className='flex flex-col'>
    <div className='overflow-hidden'>
      <img src={image_url} alt="" className='lg:w-[30rem] md:w-[20rem] lg:h-[20rem] md:h-[15rem] w-full p-2 transition-transform duration-300 hover:scale-105'/>
      </div>
      <h1 className='font-semibold text-xl lg:w-[30rem] md:w-[20rem]'>{title}</h1>
      <p className='lg:w-[30rem] md:w-[20rem]'>{description}</p>
      <button className='lg:w-[30rem] md:w-[20rem]'>Read more</button>
    </div>
  )
}

export default GardeningBasic
