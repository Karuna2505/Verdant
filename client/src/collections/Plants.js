import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import { getPlants } from "../api";
import Filter from "../components/Filter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Plants = ({ onAddToCart, cartItems }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state
  const [sortCriteria, setSortCriteria] = useState(""); // Manage sorting state

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true); // Set loading to true
      const data = await getPlants();
      setPlants(data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const sortPlants = (criteria) => {
    let sortedPlants = [...plants];
    if (criteria === "priceHighToLow") {
      sortedPlants.sort((a, b) => b.price - a.price);
    } else if (criteria === "priceLowToHigh") {
      sortedPlants.sort((a, b) => a.price - b.price);
    } else if (criteria === "aToZ") {
      sortedPlants.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "zToA") {
      sortedPlants.sort((a, b) => b.name.localeCompare(a.name));
    }
    setPlants(sortedPlants);
    setSortCriteria(criteria);
  };

  return (
    <div className="w-full text-[#357b57]">
      <h1 className="font-medium text-3xl pb-4 pt-10 md:px-20 px-10">Plants</h1>
      <p className="text-lg pb-4 md:px-20 px-10">
        Indoor plants are an absolute delight no matter where you live. But keeping plants allows you to ensure that
        despite the traffic and pollution, you and your plants live in a small bubble, protected from the adversities of
        city troubles! Create your perfect indoor oasis with plants.
      </p>

      <div className="flex gap-1 px-4 md:px-12">
        <div className="w-2/12">
        <div className="my-6 mr-4 ml-10 sm:flex sm:flex-col">
          <h1 className="text-lg mb-2">Sort By:</h1>
          <select
            id="sort"
            value={sortCriteria}
            onChange={(e) => sortPlants(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="aToZ">Name: A to Z</option>
            <option value="zToA">Name: Z to A</option>
          </select>
        </div>
        <div className="my-6 mr-4 ml-10 sm:flex sm:flex-col gap-4 hidden text-[15px]">
          <div className="flex justify-between">
            <h1 className="text-lg">Filters</h1>
            <h1 className="font-medium sliding-underline pt-1">CLEAR ALL</h1>
          </div>
          <Filter title="Type of Plants" category={["Indoor Plants", "Outdoor Plants"]} />
          <Filter title="Price" category={["Below 100", "100-200", "200-300", "Above 300"]} />
        </div>
        </div>
        <div className="w-full md:w-10/12 flex justify-center items-center flex-wrap gap-4 md:gap-12 my-6">
          {loading || plants.length === 0 ? ( // Show skeletons if loading or no data
            Array(6)
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
            plants.map((plant) => (
              <PlantCard
                key={plant.id} // Ensure each child has a unique key
                item={plant}
                type="plant"
                cartItems={cartItems}
                onAddToCart={onAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Plants;
