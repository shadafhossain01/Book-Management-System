import React, { useState } from "react";
import { useBooks } from "../context/BookContext";

const SortBooks = () => {
    const {updateFilter} = useBooks()
    const [selected,setSelected]=useState("")
    
    const handleDropdown=(e)=>{
        setSelected(e.target.value)
        updateFilter({
          sort: selected == "default" ? "" : e.target.value,
          page: 1,
        });
    }
  return (
    <>
      <select
        value={selected}
        onChange={handleDropdown}
        className="px-2 bg-[#F5F5F2]"
      >
        <option value="default">Default</option>
        <option value="newtoold">New to Old</option>
        <option value="oldtonew">Old to New</option>
        <option value="hightolow">High to Low</option>
        <option value="lowtohigh">Low to High</option>
      </select>
    </>
  );
};

export default SortBooks;
