import React from 'react'


const GardeningBasic = ({title,image_url,description}) => {
  return (
    <div className=''>
    <div className='overflow-hidden'>
      <img src={image_url} alt="" className='w-[30rem] h-[20rem] transition-transform duration-300 hover:scale-105'/>
      </div>
      <h1 className='font-semibold text-xl w-[30rem]'>{title}</h1>
      <p className='w-[30rem]'>{description}</p>
      <button>Read more</button>
    </div>
  )
}

export default GardeningBasic
