import { useEffect, useState } from 'react';
import { getCategories, deleteCategories } from '../../../utils/axios-instance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/common/CommonTable';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

const Admin_Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await getCategories();
      if (error) {
        toast.error('Something went wrong, please try again.');
      }
      setCategories(data);
    })();
  }, []);

  const categoriesArray = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'update', label: 'Update', disableSorting:true },
    { key: 'delete', label: 'Delete', disableSorting: true }
  ];

  const deleteCategoryById = async () => {
    const { success, error } = await deleteCategories(categoryIdToDelete);
    if (success) {
      toast.success('Successfully deleted category');
      setCategories(previousCategories =>
        previousCategories.filter(category => category.id !== categoryIdToDelete)
      );
    } else {
      toast.error('Error in deleting category');
    }
    setShowModal(false);
  };

  const handleDelete = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setShowModal(true);
  };

  const handleUpdate = async categoryId => {
    navigate(`/admin-update-category/${categoryId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl mt-2">All-Categories</h1>
      <button
        className="bg-[#D88552] py-2 px-4 rounded"
        onClick={() => navigate('/admin-add-categories')}
      >
        ADD CATEGORY
      </button>
      <CommonTable
        data={categories}
        headers={categoriesArray}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <ConfirmDeleteModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={deleteCategoryById}
        itemId={categoryIdToDelete}
      />
    </div>
  );
};

export default Admin_Categories;
