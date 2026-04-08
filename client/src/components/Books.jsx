import React from "react";
import { useBooks } from "../context/BookContext";
import BookBox from "./BookBox";

const Books = () => {
    const { books }=useBooks()
  return (
    books.length>0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
     {books.map((book)=>(
                <BookBox book={book} item={book}/>
            ))}
    </div>):(<h2 className="mt-5 text-center font-semibold"> No Books Found</h2>)
    
  );
};

export default Books;
