import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../utils/axios-instance";
import RegisterUser from "../../Register/RegisterUser";
import { toast } from "react-toastify";
function Admin_Update_Users() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const fetchData = async () => {
    const { data, error } = await getUserById(userId);
    if (error) {
      toast.error("Something went wrong, please try again.");
    }
    setUserData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <RegisterUser isFromAdmin={true} userData={userData} />;
}

export default Admin_Update_Users;
