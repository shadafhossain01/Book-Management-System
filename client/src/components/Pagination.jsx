import { useEffect, useState } from "react";
import { useBooks } from "../context/BookContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  const { fetchBooks, pagination, updateFilter } = useBooks();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(pagination.currentPage)

      const getData = async () => {
        const data = await fetchBooks();

        const pageArray = [];
        for (let i = 1; i <= data.totalPages; i++) {
          pageArray.push(i);
        }
        setPages(pageArray);
      };

  useEffect(() => {
    getData();
  }, []);

  const handleChangePage=(value)=>{
    setCurrentPage(value)
    updateFilter({
        page:value
    })
  }

  return (
    <div className="mt-12 text-center flex justify-center items-center gap-x-2">
    
      <button
        value={currentPage}
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage == 1}
        className="px-3 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="h-4 w-4" />

      </button>
      {pages.map((page) => (
        <button
          value={currentPage}
          onClick={() => handleChangePage(page)}
          key={page}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 
                 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {page}
        </button>
      ))}

      <button
        value={currentPage}
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage == pagination.totalPages}
        className="px-3 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {" "}
        <FaChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
