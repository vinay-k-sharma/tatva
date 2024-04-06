import {useEffect,useState} from 'react'
import {getCategories,deleteCategories} from '../../utils/axios-instance'
import { toast } from "react-toastify";
import CommonTable from '../../components/common/CommonTable';
const Admin_Categories = () => {
  const [categories,setCategories] = useState([])
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
console.log(categories)
  return (
    <div>
      Admin-Categories
      <CommonTable
      data={categories}
      headers={categoriesArray}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default Admin_Categories
