import React from "react"; 
import { Link } from "react-router";

const Ebook = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#F5F5F2]">
      <img
        src="/book-icon.png"
        alt="Logo"
        className="mb-8"
      />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700  mb-4">
        Page is under maintenance
      </h1>
      <p className="text-center text-[#FE9A00] text-lg md:text-xl lg:text-2xl mb-8">
        We're working hard to improve the user experience. Stay tuned!
      </p>
      <div className="flex space-x-4">
        <Link
          to="/"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded "
        >
          Contact Us
        </Link>
        <Link
          to="/"
          className="border-2 border-gray-800 text-black font-bold py-3 px-6 rounded "
        >
          Reload
        </Link>
      </div>
    </div>
  );

};

export default Ebook;
