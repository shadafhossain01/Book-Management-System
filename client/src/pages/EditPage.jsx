import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useBooks } from "../context/BookContext";
import axios from "axios";
import toast from "react-hot-toast";

const EditPage = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const { register, handleSubmit, setValue } = useForm();
    const { singleBook, currentBook } = useBooks();

    const getDetails=async()=>{
        await singleBook(id)
    }
  useEffect(() => {
    if (currentBook) {
      setValue("title", currentBook.title);
      setValue("author", currentBook.author);
      setValue("publishedYear", currentBook.publishedYear);
      setValue("genre", currentBook.genre);
      setValue("price", currentBook.price);
      setValue("description", currentBook.description);
      setValue("imageUrl", currentBook.imageUrl);
      setValue("bookUrl", currentBook.bookUrl);
    }
  }, [currentBook]);

    useEffect(()=>{
        getDetails()
    },[id])

    const onSubmit = async(data) => {
            const price = parseFloat(data.price);
            data.price = price;
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/${currentBook._id}`,data);
        toast.success("Book Updated Successfully!");
        navigate(-1)
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

        <button type="submit" className="bg-[#FE9A00] text-white px-10 py-2 rounded-sm cursor-pointer">
          Edit
        </button>
      </form>
      
    </div>
  );
};

export default EditPage;
