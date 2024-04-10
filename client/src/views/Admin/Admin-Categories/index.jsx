import { useEffect, useState } from 'react';
import { getCategories, deleteCategories } from '../../../utils/axios-instance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/common/CommonTable';

const Admin_Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async categoryId => {
    const { success, error } = await deleteCategories(categoryId);
    if (success) {
      toast.success('Successfully deleted category');
      setCategories(previousCategories =>
        previousCategories.filter(category => category.id !== categoryId)
      );
    } else {
      toast.error('Error in deleting category');
    }
  };

  const handleUpdate = async categoryId => {
    navigate(`/admin-update-category/${categoryId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl mt-2">Admin-Categories</h1>
      <div className="w-full flex justify-between items-center mb-4 px-4 md:px-0">
        <div className="flex justify-end w-full mr-12">
          <button
            className="bg-[#D88552] py-2 px-4 rounded"
            onClick={() => navigate('/admin-add-categories')}
          >
            ADD CATEGORY
          </button>
        </div>
      </div>
      <CommonTable
        data={categories}
        headers={categoriesArray}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Admin_Categories;
