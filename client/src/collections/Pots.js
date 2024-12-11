import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import { getPots } from '../api';
import PlantCard from '../components/PlantCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Pots = () => {
  const [pots, setPots] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    fetchPots();
  }, []);

  const fetchPots = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const data = await getPots();
      setPots(data);
    } catch (error) {
      console.error('Error fetching pots:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="w-full text-[#357b57]">
      <h1 className="font-medium text-3xl py-4 pt-10 md:px-20 px-10">Pots & Planters</h1>
      <p className="text-lg pb-4 md:px-20 px-10">
        Plant pots are the best way to give your plants a safe and happy home, as well as elevate your home decor game.
        With Verdant collection of sleek, elegant, and aesthetic pots and planters, you can give your plants only the
        best!
      </p>
      <div className="flex gap-1 px-4 md:px-12">
        <div className="w-2/12 my-6 mr-4 ml-10 sm:flex sm:flex-col gap-4 hidden text-[15px]">
          <div className="flex justify-between">
            <h1 className="text-lg">Filters</h1>
            <h1 className="font-medium sliding-underline pt-1">CLEAR ALL</h1>
          </div>
          <Filter title="Price" category={["Below 100", "100-200", "200-300", "Above 300"]} />
          <Filter title="Color" category={["Black", "Blue", "White", "Violet", "Pink", "Yellow", "Green"]} />
          <Filter title="Size" category={["Extra Small", "Small", "Medium", "Large", "Extra Large"]} />
        </div>
        <div className="w-full md:w-9/12 flex justify-center items-center flex-wrap gap-4 md:gap-8 my-6">
          {loading || pots.length === 0 ? (
            Array(8)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex flex-col items-start">
                  <Skeleton width={240} height={256} />
                  <Skeleton width={120} />
                  <Skeleton width={80} />
                  <Skeleton width={240} height={48} />
                </div>
              ))
          ) : (
            pots.map((pot) => (
              <PlantCard
                key={pot.name} // Ensure each child has a unique key
                name={pot.name}
                url={pot.image_url}
                price={pot.price}
                type="pot"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Pots;
