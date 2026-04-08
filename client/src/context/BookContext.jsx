import {createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { useCallback } from "react";

const BookContext=createContext()

export const BookProvider=({children})=>{
    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filter, setFilter] = useState({
      page:1,
      limit:8,
      search:"",
      genre:"",
      sort:"",
    });

    const [pagination, setPagination] = useState({
      totalBooks:0,
      currentPage:1,
      totalPages:1,
    });

    // Fetch all Books
    const fetchBooks = useCallback(async()=>{
          try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            Object.entries(filter).forEach(([key, value]) => {
              if (value !== "") {
                params.append(key, value);
              }
            });

            const books = await axios.get(
              `${import.meta.env.VITE_SERVER_URL}?${params}`,
            );
            setBooks(books.data.books);
            setPagination({
              totalBooks: books.data.totalBooks,
              currentPage: books.data.currentPage,
              totalPages: books.data.totalPages,
            });
            return books.data;
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
    },[filter]);

    // Find single Books
    const singleBook=useCallback(async(bookID)=>{
        const book = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/${bookID}`,
        );
        setCurrentBook(book.data.book[0]);
        return book.data
    },[])

    // Update Filter
    const updateFilter=useCallback((newFilter)=>{
        setFilter((prev)=>({
            ...prev,
            ...newFilter,
            page:newFilter.page ?? 1
        }))
    },[])

    useEffect(() => {
      fetchBooks();
    }, [filter]);

    const handleDeleteBook = async (id) => {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/${id}`);
      fetchBooks();
    };

    const value = {
      books,
      currentBook,
      loading,
      error,
      updateFilter,
      singleBook,
      filter,
      pagination,
      fetchBooks,
      handleDeleteBook,
    };

    return(
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    )
}

export const useBooks = () => {
  const context = useContext(BookContext);
  return context;
}; 