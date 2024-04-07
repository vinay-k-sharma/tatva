import {useEffect,useState} from 'react'
import {getCategories,deleteCategories} from '../../../utils/axios-instance'
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import CommonTable from '../../../components/common/CommonTable';
const Admin_Categories = () => {
  const [categories,setCategories] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const { data,error } = await getCategories();
      if (error) {
        toast.error("Something went wrong, please try again.");
      }
      setCategories(data);
    })();
  }, []);
  const categoriesArray = [
    {key: "id", label:"ID"},
    { key: "name", label: "Name" },
    {key:'update',label:"Update"},
    {key:'delete',label:"Delete"}
  ];
  const handleDelete = async (categoryId) => {
    const {success,error} = await deleteCategories(categoryId)
    if(success){
      toast.success("Successfully deleted category")
      setCategories((previousCategories)=> previousCategories.filter((category)=> category.id !== categoryId))
    }
    else{
      toast.error("Error in deleting category")
    }

  }
  const handleUpdate = async (categoryId) => {
    navigate(`/admin-update-category/${categoryId}`);
  };
console.log(categories)
  return (
    <div>
      Admin-Categories
      <button onClick={()=> navigate('/admin-add-categories') }>Add</button>
      <CommonTable
      data={categories}
      headers={categoriesArray}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      />
    </div>
  )
}

export default Admin_Categories
