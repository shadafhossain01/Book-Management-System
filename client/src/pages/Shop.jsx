import Books from "../components/Books";
import CategoryNav from "../components/CategoryNav";
import Pagination from "../components/Pagination";
import SortBooks from "../components/SortBooks";
import { useBooks } from "../context/BookContext";

const Shop = () => {
 const { pagination, filter } = useBooks();
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center flex-wrap border-b border-gray-200 pb-4">
        <CategoryNav />
        {/* Add sorting controls */}
        <div className="py-4 flex justify-end  px-4">
          <SortBooks />
        </div>
      </div>
      {/* Books Result */}
      <div className="py-4 text-gray-600 px-4">
        Showing{" "}
        {pagination.totalBooks > 0
          ? (pagination.currentPage - 1) * filter.limit + 1
          : 0}
        -
        <span>
          {" "}
          {Math.min(
            pagination.currentPage * filter.limit,
            pagination.totalBooks,
          )}{" "}
        </span>
        of {pagination.totalBooks} books
      </div>
      <Books />
      {pagination.totalPages > 1 && <Pagination />}
    </div>
  );
};

export default Shop;
