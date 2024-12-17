import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const Filter = ({ title, category, onFilterChange, selectedFilters }) => {
  const [internalSelectedFilters, setInternalSelectedFilters] = useState(selectedFilters);

  // Sync internalSelectedFilters with the parent filters
  useEffect(() => {
    setInternalSelectedFilters(selectedFilters);
  }, [selectedFilters]);

  // Toggle the dropdown visibility
  const [isOpen, setOpen] = useState(false);

  const toggleSign = () => {
    setOpen(!isOpen);
  };

  const handleCheckboxChange = (item) => {
    let updatedFilters;
    if (internalSelectedFilters.includes(item)) {
      updatedFilters = internalSelectedFilters.filter((filter) => filter !== item);
    } else {
      updatedFilters = [...internalSelectedFilters, item];
    }
    setInternalSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass updated filters to the parent
  };

  return (
    <div className="flex flex-col gap-2">
      <hr className="bg-[#357b57] h-[2px] w-full" />
      <div className="flex justify-between">
        <h1 className="text-lg">{title}</h1>
        <h1 className="font-medium mt-1 cursor-pointer" onClick={toggleSign}>
          {isOpen ? <FaMinus /> : <FaPlus />}
        </h1>
      </div>
      <ul className={`text-base ${isOpen ? "block" : "hidden"}`}>
        {category.map((item) => (
          <div key={item} className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-sm checked:bg-[#357b57] checked:border-[#357b57] cursor-pointer"
              checked={internalSelectedFilters.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            <li className="text-gray-800">{item}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
