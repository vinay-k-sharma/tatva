import React, { useEffect, useState } from "react";

const Filter = ({ productData, setFilterResult, setCurrentPage }) => {
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(productData.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  }, [productData]);

  const categoryChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    const filteredProducts = productData?.filter((product) =>
      product.category.toLowerCase().includes(filter.toLowerCase())
    );
    setFilterResult(filteredProducts);
  }, [productData, filter]);

  return (
    <div>
      <select
        value={filter}
        onChange={categoryChange}
        className="px-2 py-1.5 w-full md:w-48 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All</option>
        {categories?.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
