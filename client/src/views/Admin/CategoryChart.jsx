import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CategoryChart({ products }) {
  console.log("Products:", products);


  const categoryData = products.reduce((acc, product) => {
    const totalSold = parseFloat(product.total_sold); 
    if (!isNaN(totalSold)) { 
      if (acc[product.category]) {
        acc[product.category] += totalSold;
      } else {
        acc[product.category] = totalSold; 
      }
    }
    return acc;
  }, {});

  console.log(categoryData)
  console.log("Category Data:", categoryData);

  const data = Object.keys(categoryData).map(category => ({
    category,
    totalSold: categoryData[category]
  }));

  console.log("Formatted Data:", data);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Category Sales</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSold" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
