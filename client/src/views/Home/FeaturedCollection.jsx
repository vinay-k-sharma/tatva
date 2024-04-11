import Card from "../../components/common/Card";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../redux/actions/roleAction";
import { updateUser } from "../../utils/axios-instance";
import {useState,useEffect} from 'react'
import { fetchProductsRequest } from '../../redux/actions/productActions'
import Searching from '../../components/common/Searching';
import Sorting from '../../components/common/Sorting';
import Filter from '../../components/common/Filter';
import Pagination from '../../components/common/Pagination'
const FeaturedCollection = () => {
  const products = useSelector((state)=>state.product.products)
  const user = useSelector((state) => state.role.user);
  const [productData,setProductData] = useState([])
  const dispatch = useDispatch()
  const [searchResults, setSearchResults] = useState([]);
  const [sortingResult, setSortingResult] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);
  useEffect(()=>{
    dispatch(fetchProductsRequest())
  },[])
  useEffect(()=>{
    setProductData(products)
  },[products])

  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const sliceProducts = filterResult.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filterResult.length / recordsPerPage);

  const filteredData = products.filter(item => item.featured === "true");

  const shouldRenderPagination = filterResult.length > recordsPerPage;

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
    <div >
      <div className="display gap-5 flex flex-start flex-col px-4 md:flex-row justify-center items-start mt-5">
        <Searching
          dataToSearch={filteredData}
          setSearchResults={setSearchResults}
          setCurrentPage={setCurrentPage}
        />
        <Sorting
          setSortingResult={setSortingResult}
          searchResults={searchResults}
        />
        <Filter setFilterResult={setFilterResult} setCurrentPage={setCurrentPage} productData={sortingResult}/>
      </div>
    <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 mt-10">
          <div className="border-b-2 border-t-2 border-amber-800 py-2">
            <h1 className="text-amber-800 text-center text-2xl">Our Featured Collection</h1>
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
  )
}

export default FeaturedCollection

