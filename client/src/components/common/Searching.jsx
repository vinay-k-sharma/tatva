import React, { useEffect, useState } from "react";
import useDebounceHook from "../../utils/custom-hooks/useDebounce";
const Searching = ({ dataToSearch, setSearchResults, setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounceHook(searchQuery, 300);

  useEffect(() => {
    if (dataToSearch.length > 0) {
      const searchResults = dataToSearch.filter(
        (data) =>
          (data.title &&
            data.title
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())) ||
          (data.description &&
            data.description
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())) ||
          (data.name &&
            data.name
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase()))
      );
      setSearchResults(searchResults);
    }
  }, [debouncedSearchQuery, dataToSearch, setSearchResults]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  return (
    <input
      type="text"
      placeholder="Search..."
      className="px-2 py-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default Searching;