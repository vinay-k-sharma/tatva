import React, { useEffect, useState } from 'react';
import { getSkinCare, DeleteSkinCare } from '../../../utils/axios-instance';
import { toast } from 'react-toastify';
import CommonTable from '../../../components/common/CommonTable';
import { setLoader } from '../../../redux/actions/appActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal';

const Admin_Products = () => {
  const loader = useSelector(state => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [prodIdToDelete, setProdIdToDelete] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await getSkinCare();
      if (error) {
        toast.error('Something went wrong, please try again.');
      }
      setProducts(data);
    })();
  }, []);

  const productsArray = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'brand', label: 'Brand' },
    { key: 'stock', label: 'Stock' },
    { key: 'category', label: 'Category' },
    { key: 'rating', label: 'Rating' },
    { key: 'update', label: 'Update', disableSorting: true },
    { key: 'delete', label: 'Delete', disableSorting: true }
  ];

  const deleteProductById = async () => {
    dispatch(setLoader(true));
    const { success, error, data } = await DeleteSkinCare(prodIdToDelete);
    if (success) {
      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== prodIdToDelete)
      );
      toast.success('Deleted Successfully');
      dispatch(setLoader(false));
    } else {
      toast.error('Error in deleting');
    }
    setShowModal(false);
  };

  const handleDelete = (prodId) => {
    setProdIdToDelete(prodId);
    setShowModal(true);
  };

  const handleUpdate = async prodId => {
    navigate(`/admin-update-product/${prodId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl mt-2">All-Products</h1>
      <button
        className="bg-[#D88552] py-2 px-4 rounded"
        onClick={() => navigate('/admin-add-product')}
      >
        ADD PRODUCT
      </button>
      <CommonTable
        data={ products}
        headers={productsArray}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <ConfirmDeleteModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={deleteProductById}
        itemId={prodIdToDelete}
      />
    </div>
  );
};

export default Admin_Products;
