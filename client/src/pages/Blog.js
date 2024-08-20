import React from 'react'
import GardeningBasic from '../components/GardeningBasic'

const blogs=[
  {
    id:1,
    image_url:'/assets/homalomena.jpg',
    title:'Homalomena Plant Care and More',
    description:'Known for its absolutely stunning heart-shaped leaves, the Homalomena plant is a tropical gem that hails from the lush rainforests of Southeast Asia. This versatile houseplant thrives in low-light conditions and is a great air-purifying plant for indoor spaces, making it a popular choice for indoor gardening.'
  },{
    id:2,
    image_url:'/assets/cow_dung.jpg',
    title:'Cow Dung Benefits for Plants: Why Should You Use It?',
    description:'Cow manure is one of the most traditional and widely used organic fertilizers in gardening and agriculture... and with good reason! Its popularity stems from its natural composition, rich nutrient profile, and numerous benefits to soil health and plant growth.'
  },{
    id:3,
    image_url:'/assets/dragon_fruit.jpg',
    title:'How to Grow Dragon Fruit in Your Garden',
    description:'Have you ever considered growing your own Dragon fruit? Known for its striking appearance and delightful taste, dragon fruit is gaining popularity among home gardeners in India. According to the Indian Council of Agricultural Research (ICAR), Dragon fruit is not only beautiful and nutritious but also relatively easy to grow with the right conditions, and fruit seeds are one of the best ways to get fruits started in your garden.'
  },{
    id:4,
    image_url:'/assets/money_plant.jpg',
    title:'How to Grow Money Plant in Water: A Essential Guide',
    description:"The Money Plant, also known as Epipremnum aureum,﻿ is one of the most commonly seen indoor houseplants. Its easy-going nature and low demands for constant attention or maintenance make it a beloved indoor companion. Additionally, these qualities also add to its appeal for new and busy gardeners. Afterall, what's better than an absolutely stunning plant that demands very little from beginner gardeners? "
  }
]

const Blog = () => {
  return (
    <div className='text-[#357b57] mt-24 mb-8 mx-12 '>
      <div className='w-full h-auto  flex flex-col gap-6 '>
      <h1 className='text-3xl font-bold '>Gardening Basics</h1>
      <div className='grid grid-cols-2 gap-1 justify-around w-[80rem]'>
        {blogs.map(blog=>{
          return <GardeningBasic title={blog.title} image_url={blog.image_url} description={blog.description}/>
        })}
      </div>
      </div>
    </div>
  )
}

export default Blog
