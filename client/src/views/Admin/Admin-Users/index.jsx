import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../../utils/axios-instance";
import { toast } from "react-toastify";
import CommonTable from "../../../components/common/CommonTable";
import { setLoader } from "../../../redux/actions/appActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin_Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await getUsers();
      if (error) {
        toast.error("Something went wrong, please try again.");
      }
      setUsers(data);
    })();
  }, []);

  console.log(users);

  const usersArray = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "password", label: "Password" },
    { key: "update", label: "Update User" },
    { key: "delete", label: "Delete User" },
  ];

  const handleDelete = async (userId) => {
    dispatch(setLoader(true));
    const { success, error, data } = await deleteUser(userId);
    if (success) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success("Deleted Successfully");
      dispatch(setLoader(false));
    } else {
      toast.error("Error in deleting");
    }
  };

  const handleUpdate = async (userId) => {
    navigate(`/admin-update-user/${userId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl mt-2">Admin-Users</h1>
      <div className="w-full flex justify-between items-center mb-4 px-4 md:px-0">
        <div className="flex justify-end w-full mr-12">
          <button
            className="bg-[#D88552] py-2 px-4 rounded"
            onClick={() => navigate("/admin-add-user")}
          >
            ADD USER
          </button>
        </div>
      </div>
      <CommonTable
        data={users}
        headers={usersArray}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Admin_Users;
