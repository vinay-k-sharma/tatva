import { useState, useEffect } from 'react';
import { getCategories } from '../../utils/axios-instance';
import {useNavigate} from 'react-router-dom'
const CategoryCards = () => {
  const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate()
  const fetchData = async () => {
    const categoryData = await getCategories();
    setCategoryData(categoryData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="flex flex-wrap justify-center  space-between ">
      {categoryData.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCardClick(category.id)}
          className='bg-[#D88552] rounded-full flex flex-col items-center justify-evenly space-between p-4 m-4 w-32 h-32 border border-gray-200 cursor-pointer'
        >
          <p className="text-center">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
