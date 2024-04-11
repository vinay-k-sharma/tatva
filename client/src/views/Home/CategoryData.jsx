import { useEffect, useState } from 'react';
import { getCategoryById, getSkinCare } from '../../utils/axios-instance';
import { useParams } from 'react-router-dom';
import { setRole } from "../../redux/actions/roleAction";
import { updateUser } from "../../utils/axios-instance";
import { useDispatch, useSelector } from "react-redux";
import Card from '../../components/common/Card';
import Searching from '../../components/common/Searching';
import Sorting from '../../components/common/Sorting';
import Pagination from '../../components/common/Pagination'
const CategoryData = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.role.user);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [sortingResult, setSortingResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      const categoryResponse = await getCategoryById(categoryId);
      if (categoryResponse.success) {
        setCategory(categoryResponse.data);
        const productsResponse = await getSkinCare();
        if (productsResponse.success) {
          const filteredProducts = productsResponse.data.filter(
            product => product.category === categoryResponse.data.name
          );
          setProducts(filteredProducts);
        }
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const sliceProducts = sortingResult.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(sortingResult.length / recordsPerPage);
  const shouldRenderPagination = sortingResult.length > recordsPerPage;
  const isProductLiked = (product) => {
    if (user && user.favouriteProducts) {
      return user.favouriteProducts.some(
        (favProduct) => favProduct.id === product.id
      );
    }
    return false;
  };

  const handleLikesDislikes = async (product) => {
    if (user) {
      const isLiked = user.favouriteProducts.filter(
        (item) => item.id === product.id
      );

      if (isLiked.length === 0) {
        user.favouriteProducts.push(product);
        try {
          await updateUser(user);
          dispatch(setRole("user", user));
        } catch (error) {
          console.log(error);
        }
      } else {
        const updatedLikedProducts = user.favouriteProducts.filter(
          (item) => item.id != product.id
        );
        const updatedUser = {
          ...user,
          favouriteProducts: updatedLikedProducts,
        };
        await updateUser(updatedUser);
        dispatch(setRole("user", updatedUser));
      }
    }
  };
  return (
    <div>
         <div className="display gap-5 flex flex-start flex-col px-4 md:flex-row justify-center items-start mt-5">
        <Searching
          dataToSearch={products}
          setSearchResults={setSearchResults}
          setCurrentPage={setCurrentPage}
        />
        <Sorting
          setSortingResult={setSortingResult}
          searchResults={searchResults}
        />
      </div>
        <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 mt-10">
          <div className="border-b-2 border-t-2 border-amber-800 py-2">
            <h1 className="text-amber-800 text-center text-2xl">{category ? category.name : ''} Products</h1>
          </div>
        </div>
      </div>
      <Card
      data={sliceProducts}
      handleLikesDislikes={handleLikesDislikes}
      isProductLiked={isProductLiked}
      />
      {shouldRenderPagination && (
          <div className=" flex justify-center items-center w-auto h-10 my-6">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
    </div>
  );
};

export default CategoryData;
