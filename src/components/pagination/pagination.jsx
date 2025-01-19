import { useCallback, useMemo } from "react";

/* eslint-disable react/prop-types */
function Pagination({ totalPages, currentPage = 1, onPageChange }) {
  const visiblePages = 10;

  // Calculate the start and end of the visible range
  const startPage = useMemo(
    () =>
      Math.max(
        1,
        Math.min(
          currentPage - Math.floor(visiblePages / 2),
          totalPages - visiblePages + 1
        )
      ),
    [currentPage, totalPages]
  );
  const endPage = useMemo(
    () => Math.min(totalPages, startPage + visiblePages - 1),
    [totalPages, startPage]
  );

  // Generate the array of page numbers to display
  const pageNumbers = useMemo(
    () =>
      Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ),
    [startPage, endPage]
  );

  const handlePageChange = useCallback(
    (page) => {
      onPageChange(page);
    },
    [onPageChange]
  );

  return (
    <div className='pagination'>
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
