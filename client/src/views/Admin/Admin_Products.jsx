import {useEffect,useState} from 'react'
import {getSkinCare,DeleteSkinCare} from '../../utils/axios-instance'
import { toast } from "react-toastify";
import CommonTable from '../../components/common/CommonTable';
import {setLoader} from '../../redux/actions/appActions'
import {useSelector,useDispatch} from 'react-redux'
const Admin_Products = () => {
  const loader = useSelector((state)=> state.app)

  const dispatch  = useDispatch()
  const [products,setProducts] = useState([])
  useEffect(() => {
    (async () => {
      const { data,error } = await getSkinCare();
      if (error) {
        toast.error("Something went wrong, please try again.");
      }
      setProducts(data);
    })();
  }, []);
  const productsArray = [
    {key: "id", label:"ID"},
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "brand", label: "Brand" },
    {key:"stock",label:"Stock"},
    { key: "category", label: "Category" },
    { key: "rating", label: "Rating" },
    {key:'update',label:"Update"},
    {key:'delete',label:"Delete"}
  ];
console.log(products)
const handleDelete = async (prodId) => {
  dispatch(setLoader(true))
  const {success,error,data} = await DeleteSkinCare(prodId)
  if(success){
    setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== prodId)
        );
    toast.success("Deleted Successfully")
  }
  else{
    toast.error("Error in deleting")
  }
}
  return (
    <div>
      Admin-Products
      <CommonTable
      data={products}
      headers={productsArray}
      handleDelete={handleDelete}
      // handleUpdate={handleUpdate}
      />
    </div>
  )
}

export default Admin_Products
