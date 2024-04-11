import React from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    nPages > 0 && (
      <div className="mt-6">
        <ul className="flex justify-center space-x-4">
          <li
            className={`grid place-items-center text-[#D88552] rounded-l focus:outline-none ${
              currentPage === 1 ? "text-gray-500 cursor-not-allowed" : ""
            }`}
          >
            <button
              onClick={goToPrevPage}
              className={`px-2 py-1  ${
                currentPage === 1 ? "cursor-not-allowed text-sm" : "text-xl"
              }`}
              disabled={currentPage === 1}
            >
              <GrPrevious />
            </button>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`rounded focus:outline-none p-1 min-w-[30px] min-h-[30px] grid place-items-center border-[#D88552] hover:bg-[#D88552] hover:text-white cursor-pointer transition-all 
              ${
                currentPage === pgNumber
                  ? "bg-[#D88552] border-2 border-[#D88552] text-white"
                  : "border-2 border:[#D] text-[#D88552]"
              }`}
            >
              <button
                className="text-center w-full"
                onClick={() => setCurrentPage(pgNumber)}
              >
                {pgNumber}
              </button>
            </li>
          ))}
          <li
            className={` grid place-items-center text-[#D88552] rounded-r focus:outline-none ${
              currentPage === nPages ? "text-gray-500 cursor-not-allowed" : ""
            }`}
          >
            <button
              onClick={goToNextPage}
              className={`px-2 py-1 ${
                currentPage === nPages
                  ? "cursor-not-allowed text-sm"
                  : "text-xl"
              }`}
              disabled={currentPage === nPages}
            >
              <GrNext />
            </button>
          </li>
        </ul>
      </div>
    )
  );
};

export default Pagination;
