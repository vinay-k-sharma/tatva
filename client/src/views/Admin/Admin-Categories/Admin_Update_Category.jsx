import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../../utils/axios-instance";
import RegisterCategory from "../../Register/RegisterCategory";
import { toast } from "react-toastify";
function Admin_Update_Users() {
  const {categoryId} = useParams();
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    (async () => {
      const { data,error } = await getCategoryById(categoryId);
      if (error) {
        toast.error("Something went wrong, please try again.");
      }
      setCategoryData(data);
    })();
  }, []);

  return <RegisterCategory categoryData={categoryData} />;
}

export default Admin_Update_Users;
