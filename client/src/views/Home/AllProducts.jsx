import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { setRole } from "../../redux/actions/roleAction";
import { updateUser } from "../../utils/axios-instance";
import Card from '../../components/common/Card'
import Pagination from '../../components/common/Pagination';
import Searching from '../../components/common/Searching';
import Sorting from '../../components/common/Sorting';
import Filter from '../../components/common/Filter';
const AllProducts = () => {
    const products = useSelector((state) => state.product.products)
    const user = useSelector((state) => state.role.user);
    const dispatch = useDispatch();
    const [searchResults, setSearchResults] = useState([]);
    const [sortingResult, setSortingResult] = useState([]);
    const [filterResult, setFilterResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6);
    const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const sliceProducts = filterResult.slice(indexOfFirstRecord, indexOfLastRecord);
  const shouldRenderPagination = filterResult.length > recordsPerPage;

  const nPages = Math.ceil(filterResult.length / recordsPerPage);

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
        <Filter setFilterResult={setFilterResult} setCurrentPage={setCurrentPage} productData={sortingResult}/>
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
  )
}

export default AllProducts
