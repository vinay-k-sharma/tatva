import Card from "../../components/common/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyCarousel from "../../components/common/MyCarousel";
import { setRole } from "../../redux/actions/roleAction";
import { updateUser } from "../../utils/axios-instance";
import BestSeller from "./BestSeller";
import Featured from "./Featured";
import CategoryCards from "./CategoryCards";
const SkinCareProducts = ({ data }) => {
  const user = useSelector((state) => state.role.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(data);
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
    <>
      <div className="">
        <MyCarousel>
          {data.map((item) => (
            <img
              src={item.thumbnail}
              key={item.id}
              alt={item.name}
              onClick={() => navigate(`/products/${item.id}`)}
              className="mt-5  "
            />
          ))}
        </MyCarousel>
      </div>

      <BestSeller
        data={data}
        handleLikesDislikes={handleLikesDislikes}
        isProductLiked={isProductLiked}
      />
      <Featured
        data={data}
        handleLikesDislikes={handleLikesDislikes}
        isProductLiked={isProductLiked}
      />

      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 mt-10">
          <div className="border-b-2 border-t-2 border-amber-800 py-2">
            <h1 className="text-amber-800 text-center text-2xl">
              Product Categories
            </h1>
          </div>
        </div>
      </div>
      <CategoryCards />

      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 mt-10">
          <div className="border-b-2 border-t-2 border-amber-800 py-2">
            <h1 className="text-amber-800 text-center text-2xl">Our Purpose</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-10">
        <div className="w-full md:w-1/2 ml-5">
          <img
            className="w-full h-full object-cover"
            src="https://ayuga.in/cdn/shop/files/For_Golden_Glow_600x.jpg?v=1702704664"
            alt="Golden Glow"
          />
        </div >
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h1 className="text-[#D88552] text-2xl md:text-4xl mb-4">
            For a golden glow
          </h1>
          <p className="text-base md:text-lg">
            Tatva stands for celebrating the new age/’yuga’ of reviving the
            eternal wisdom of nature’s treasured ingredients, sourced from
            places where they grow in their most potent form. We aim to harness
            the power of natural herbs to address skincare needs by bringing
            back the knowledge of golden ingredients, revered by generations of
            the past. Aiming to preserve the natural potency of the ingredients,
            we present to you products that hold the legacy of timeless
            traditions, helping you unlock an opulent skincare experience.
          </p>
        </div>
      </div>
    </>
  );
};

export default SkinCareProducts;
