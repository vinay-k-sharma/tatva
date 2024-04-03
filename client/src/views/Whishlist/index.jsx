import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../utils/axios-instance";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../redux/actions/roleAction";
import Card from "../../components/common/Card";
import EmptyWishlist from "./EmptyWishlist";
import { AiOutlineClose } from "react-icons/ai";
const Wishlist = () => {
  const dispatch = useDispatch();
  const wishListFlag = true
  const user = useSelector((state) => state.role.user);

  const navigate = useNavigate();

  const removeFromWishlist = async (productId) => {
    try {
      const updatedFavouriteProducts = user.favouriteProducts.filter(
        (product) => product.id != productId
      );
      const updatedUser = { ...user, favouriteProducts: updatedFavouriteProducts };
      await updateUser(updatedUser)
      dispatch(setRole("user", updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user.favouriteProducts) 

  return (
  
      <div  >
        {user.favouriteProducts.length > 0 ? (
              <Card data={user.favouriteProducts} wishListFlag={wishListFlag} removeFromWishlist={removeFromWishlist}/>
          )
         : (
          <EmptyWishlist/>
        )}
    </div>
  );
};

export default Wishlist;
