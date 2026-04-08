import React, { useState } from "react";
import { useBooks } from "../context/BookContext";

const CategoryNav = () => {
    const { updateFilter }=useBooks()
    const categories = [ "All Collections", "Fiction", "Adventure", "Romance",  "Dystopian", "Historical", "Non-Fiction" ]
    const [category, setCategory] = useState("All Collections")

    const handleChangeCategory=(value)=>{
        setCategory(value)
        updateFilter({
          genre: value == "All Collections" ? "" : value,
          page: 1,
        });
    }

  return (
    <>
      {categories.map((item) => (
        <button
          key={item}
          value={category}
          onClick={() => handleChangeCategory(item)}
          className={`whitespace-nowrap cursor-pointer py-2 px-1 border-b-2 text-sm font-medium transition-colors
                ${
                  category === item
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
        >
          {item}
        </button>
      ))}
    </>
  );
};

export default CategoryNav;
