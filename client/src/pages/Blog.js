import React from 'react'
import GardeningBasic from '../components/GardeningBasic'

const Blog = () => {
  return (
    <div className='text-[#357b57] mt-24 mb-8 mx-12'>
      <div className='w-full h-auto  flex flex-col gap-6'>
      <h1 className='text-2xl'>Gardening Basics</h1>
      <div className='flex flex-wrap gap-6 w-full'>
        <GardeningBasic />
        <GardeningBasic />
        <GardeningBasic />
        <GardeningBasic />
      </div>
      </div>
    </div>
  )
}

export default Blog
