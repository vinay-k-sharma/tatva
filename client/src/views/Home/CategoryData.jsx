import { useEffect, useState } from 'react';
import { getCategoryById, getSkinCare } from '../../utils/axios-instance';
import { useParams } from 'react-router-dom';
import { setRole } from "../../redux/actions/roleAction";
import { updateUser } from "../../utils/axios-instance";
import { useDispatch, useSelector } from "react-redux";
import Card from '../../components/common/Card';
const CategoryData = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.role.user);
  const dispatch = useDispatch();

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
        <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 mt-10">
          <div className="border-b-2 border-t-2 border-amber-800 py-2">
            <h1 className="text-amber-800 text-center text-2xl">{category ? category.name : ''} Products</h1>
          </div>
        </div>
      </div>
      <Card
      data={products}
      handleLikesDislikes={handleLikesDislikes}
      isProductLiked={isProductLiked}
      />
    </div>
  );
};

export default CategoryData;