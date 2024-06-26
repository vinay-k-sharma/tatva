import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../../utils/axios-instance";
import { toast } from "react-toastify";
import CommonTable from "../../../components/common/CommonTable";
import { setLoader } from "../../../redux/actions/appActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

const Admin_Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
const [userIdToDelete, setUserIdToDelete] = useState(null);

  const fetchData = async () => {
    const { data, error } = await getUsers();
    if (error) {
      toast.error("Something went wrong, please try again.");
    }
    setUsers(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const usersInfoColumn = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email", disableSorting: true },
    { key: "password", label: "Password", disableSorting: true },
    { key: "update", label: "Update User", disableSorting: true },
    { key: "delete", label: "Delete User", disableSorting: true },
  ];

  const deleteUserById = async () => {
    dispatch(setLoader(true));
    const { success, error, data } = await deleteUser(userIdToDelete);
    if (success) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
      toast.success("Deleted Successfully");
      dispatch(setLoader(false));
    } else {
      toast.error("Error in deleting");
    }
    setShowModal(false);
  };

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(true);
  };
  

  const handleUpdate = async (userId) => {
    navigate(`/admin-update-user/${userId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl mt-2">All-Users</h1>
          <button
            className="bg-[#D88552] py-2 px-4 rounded"
            onClick={() => navigate("/admin-add-user")}
          >
            ADD USER
          </button>

      <CommonTable
        data={users}
        headers={usersInfoColumn}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
       <ConfirmDeleteModal
      open={showModal}
      handleClose={() => setShowModal(false)}
      handleDelete={deleteUserById}
      itemId={userIdToDelete}
    />
    </div>
  );
};

export default Admin_Users;
