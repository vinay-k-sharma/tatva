import Card from '../../components/common/Card'
import {useDispatch,useSelector} from 'react-redux'

import MyCarousel from '../../components/common/Carousel'
import { setRole } from '../../redux/actions/roleAction'
import { updateUser } from '../../utils/axios-instance'

const SkinCareProducts = ({data}) => {
    const user = useSelector((state)=>state.role.user)
    const dispatch = useDispatch()

    
    const isProductLiked = (product) => {
        if (user && user.favouriteProducts) {
          return user.favouriteProducts.some((favProduct) => favProduct.id === product.id);
        }
        return false;
      };

    const handleLikesDislikes = async(product) => {
    if(user){
        const isLiked = user.favouriteProducts.filter((item)=> item.id===product.id)

        if(isLiked.length===0){
            user.favouriteProducts.push(product)
            try{
                await updateUser(user)
                dispatch(setRole("user",user))
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            const updatedLikedProducts = user.favouriteProducts.filter((item)=> item.id != product.id)
            const updatedUser = {...user,favouriteProducts:updatedLikedProducts}
            await updateUser(updatedUser)
            dispatch(setRole("user",updatedUser))
        }
    }
    
    }
  return (
    <>
      <MyCarousel data={data} />
       {/* <MyCarousel data={productData}  >
        
       </MyCarousel> */}
      <Card data={data} handleLikesDislikes={handleLikesDislikes} isProductLiked={isProductLiked} />

    </>
  )
}

export default SkinCareProducts
