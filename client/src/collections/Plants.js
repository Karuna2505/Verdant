import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import { getPlants } from "../api";
import Filter from "../components/Filter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Plants = ({ onAddToCart, cartItems }) => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("");
  const [filters, setFilters] = useState({ price: [], type: [] });

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, plants]);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const data = await getPlants();
      setPlants(data);
      setFilteredPlants(data); // Initially, display all plants
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let updatedPlants = [...plants];

    if (filters.price.length > 0) {
      updatedPlants = updatedPlants.filter((plant) =>
        filters.price.some((range) => {
          if (range === "Below 100") return plant.price < 100;
          if (range === "100-200") return plant.price >= 100 && plant.price <= 200;
          if (range === "200-300") return plant.price >= 200 && plant.price <= 300;
          if (range === "Above 300") return plant.price > 300;
          return false;
        })
      );
    }

    if (filters.type.length > 0) {
      updatedPlants = updatedPlants.filter((plant) =>
        filters.type.some((filterType) =>
          plant.type === filterType
        )
      );
      
    }

    setFilteredPlants(updatedPlants);
    setSortCriteria("");
  };

  const handleFilterChange = (updatedFilters, filterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: updatedFilters,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ price: [], type: [] });
  };

  const sortPlants = (criteria) => {
    let sortedPlants = [...filteredPlants];
    if (criteria === "priceHighToLow") {
      sortedPlants.sort((a, b) => b.price - a.price);
    } else if (criteria === "priceLowToHigh") {
      sortedPlants.sort((a, b) => a.price - b.price);
    } else if (criteria === "aToZ") {
      sortedPlants.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "zToA") {
      sortedPlants.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredPlants(sortedPlants);
    setSortCriteria(criteria);
  };

  return (
    <div className="w-full text-[#357b57]">
      <h1 className="font-medium text-3xl pb-4 pt-10 md:px-20 px-10">Plants</h1>
      <p className="text-lg pb-4 md:px-20 px-10">
        Indoor plants are an absolute delight no matter where you live...
      </p>

      <div className="flex gap-1 px-4 md:px-12">
        <div className="w-[28%]">
          <div className="my-6 ml-10 flex items-center border border-[#357b57] rounded-md overflow-hidden shadow-sm relative cursor-pointer">
            <h1 className="text-lg font-medium bg-[#357b57] text-white py-2 px-3">Sort by:</h1>
            <select
              id="sort"
              value={sortCriteria}
              onChange={(e) => sortPlants(e.target.value)}
              className="flex-1 text-lg p-2 appearance-none cursor-pointer text-gray-700 border-l border-gray-300 focus:outline-none focus:ring-0 rounded-r-md"
            >
              <option value="">Relevance</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="aToZ">Name: A to Z</option>
              <option value="zToA">Name: Z to A</option>
            </select>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
      ▼
    </div>
          </div>

          <div className="my-6 ml-10 sm:flex sm:flex-col gap-4 hidden text-[15px]">
            <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Filters</h1>
          <button
            className="mt-2 text-[#357b57] font-semibold"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
          </div>
            <Filter
              title="Price"
              category={["Below 100", "100-200", "200-300", "Above 300"]}
              onFilterChange={(updatedFilters) => handleFilterChange(updatedFilters, "price")}
              selectedFilters={filters.price} // Pass the selected filters
            />
            <Filter
              title="Type of Plants"
              category={["indoor", "outdoor","versatile"]}
              onFilterChange={(updatedFilters) => handleFilterChange(updatedFilters, "type")}
              selectedFilters={filters.type} // Pass the selected filters
            />
          </div>
        </div>

        <div className="w-full flex justify-center items-center flex-wrap gap-4 md:gap-6 my-6">

          {loading || filteredPlants.length === 0 ? (
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
            filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
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
