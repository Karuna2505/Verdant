import React, { useState, useEffect } from "react";
import PotCard from "../components/PlantCard"; // Assuming you have a PotCard component
import { getPots } from "../api"; // Assuming you have a getPots function
import Filter from "../components/Filter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Pots = ({ onAddToCart, cartItems }) => {
  const [pots, setPots] = useState([]);
  const [filteredPots, setFilteredPots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("");
  const [filters, setFilters] = useState({ price: [], color: [], size: [] });

  useEffect(() => {
    fetchPots();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, pots]);

  const fetchPots = async () => {
    try {
      setLoading(true);
      const data = await getPots();
      setPots(data);
      setFilteredPots(data); // Initially, display all pots
    } catch (error) {
      console.error("Error fetching pots:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let updatedPots = [...pots];

    // Filter by Price
    if (filters.price.length > 0) {
      updatedPots = updatedPots.filter((pot) =>
        filters.price.some((range) => {
          if (range === "Below 100") return pot.price < 100;
          if (range === "100-200") return pot.price >= 100 && pot.price <= 200;
          if (range === "200-300") return pot.price >= 200 && pot.price <= 300;
          if (range === "Above 300") return pot.price > 300;
          return false;
        })
      );
    }

    // Filter by Color
    if (filters.color.length > 0) {
      updatedPots = updatedPots.filter((pot) => filters.color.includes(pot.color));
    }

    // Filter by Size
    if (filters.size.length > 0) {
      updatedPots = updatedPots.filter((pot) => filters.size.includes(pot.size));
    }

    setFilteredPots(updatedPots);
  };

  const handleFilterChange = (updatedFilters, filterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: updatedFilters,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ price: [], color: [], size: [] });
  };

  const sortPots = (criteria) => {
    let sortedPots = [...filteredPots];
    if (criteria === "priceHighToLow") {
      sortedPots.sort((a, b) => b.price - a.price);
    } else if (criteria === "priceLowToHigh") {
      sortedPots.sort((a, b) => a.price - b.price);
    } else if (criteria === "aToZ") {
      sortedPots.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "zToA") {
      sortedPots.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredPots(sortedPots);
    setSortCriteria(criteria);
  };

  return (
    <div className="w-full text-[#357b57]">
      <h1 className="font-medium text-3xl pb-4 pt-10 md:px-20 px-10">Pots</h1>
      <p className="text-lg pb-4 md:px-20 px-10">
      Plant pots are the best way to give your plants a safe and happy home, as well as elevate your home decor game. With Verdant collection of sleek, elegant, and aesthetic pots and planters, you can give your plants only the best!
      </p>

      <div className="flex gap-1 px-4 md:px-12">
        <div className="w-[28%]">
          <div className="my-6 ml-10 flex items-center border border-[#357b57] rounded-md overflow-hidden shadow-sm relative cursor-pointer">
            <h1 className="text-lg font-medium bg-[#357b57] text-white py-2 px-3">Sort by:</h1>
            <select
              id="sort"
              value={sortCriteria}
              onChange={(e) => sortPots(e.target.value)}
              className="flex-1 text-lg p-2 appearance-none cursor-pointer text-gray-700 border-l border-gray-300 focus:outline-none focus:ring-0 rounded-r-md"
            >
              <option value="">Relevance</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="aToZ">Name: A to Z</option>
              <option value="zToA">Name: Z to A</option>
            </select>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
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
              title="Color"
              category={["White", "Grey", "Brown", "Silver", "Clear", "Marble", "Beige", "Multicolor", "Copper", "Black", "Yellow"]}
              onFilterChange={(updatedFilters) => handleFilterChange(updatedFilters, "color")}
              selectedFilters={filters.color} // Pass the selected filters
            />
            <Filter
              title="Size"
              category={["Small", "Medium", "Large"]}
              onFilterChange={(updatedFilters) => handleFilterChange(updatedFilters, "size")}
              selectedFilters={filters.size} // Pass the selected filters
            />
          </div>
        </div>

        <div className="w-full flex justify-center items-center flex-wrap gap-4 md:gap-6 my-6">
        {loading ? (
  // Show skeleton loaders when loading
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
) : filteredPots.length === 0 ? (
  // Show "No results found" message when no plants match
  <div className="text-center text-gray-500 text-lg my-10">
    <p>No pots available. Try adjusting filters or sorting options.</p>
  </div>
) : (
  // Show plant cards when data is available
  filteredPots.map((pot) => (
    <PotCard
      key={pot.id}
      item={pot}
      type="pot"
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

export default Pots;
