import React,{useState,useEffect} from 'react'
import PlantCard from '../components/PlantCard'
import { getPlants } from '../api'
import Filter from '../components/Filter'


const Plants = () => {
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
    <div className='w-full text-[#357b57]'>
      <h1 className='font-medium text-2xl py-4 md:px-20 px-10'>Plants</h1>
      <p className='pb-4 md:px-20 px-10'>Indoor plants are an absolute delight no matter where you live. But keeping plants allows you to ensure that despite the traffic and pollution, you and your plants live in a small bubble, protected from the adversities of city troubles! Create your perfect indoor oasis with plants.</p>
      <div className='flex gap-1 px-4 md:px-12'>
        <div className='w-2/12 my-6 mr-4 ml-10 sm:flex sm:flex-col gap-4 hidden text-[15px]'>
        <div className='flex justify-between'>
  <h1>Filters</h1>
  <h1 className='font-medium sliding-underline'>CLEAR ALL</h1>
  </div>
          <Filter title="Type of Plants" category={[ "Indoor Plants","Outdoor Plants" ]}/>
          <Filter title="Price" category={ ["Below 100","100-200","200-300","Above 300"]}/>
        
        </div>
        <div className='w-full  md:w-9/12 flex justify-center items-center flex-wrap gap-4 md:gap-8 my-6'>
        {plants.map((plant) => (
        <PlantCard key={plant.id} name={plant.name} price={plant.price} url={plant.image_url}/>
      ))}
        </div>
      </div>
    </div>
  )
}

export default Plants
