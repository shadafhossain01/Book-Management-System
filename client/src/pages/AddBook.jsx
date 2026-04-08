import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddBook = () => {
        const navigate = useNavigate();
        const { register, handleSubmit } = useForm();

        const onSubmit = async (data) => {
          const price = parseFloat(data.price);
          data.price = price;
           await axios.post(
             `${import.meta.env.VITE_SERVER_URL}/book`,
             data,
           );
           toast.success("Book Added Successfully!");
           navigate(-1);
        };
  return (
    <div className="container mx-auto py-10 w-1/2">
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            {...register("title")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            {...register("author")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            {...register("description")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="text"
            {...register("price")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700">Genre</label>
          <input
            type="text"
            {...register("genre")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700">PublishedYear</label>
          <input
            type="text"
            {...register("publishedYear")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700">Book Url</label>
          <input
            type="text"
            {...register("bookUrl")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700">image Url</label>
          <input
            type="text"
            {...register("imageUrl")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-[#FE9A00] text-white px-10 py-2 rounded-sm cursor-pointer"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
