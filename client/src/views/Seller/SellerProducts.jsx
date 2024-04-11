import { useEffect, useState } from 'react';
import { getSkinCare, DeleteSkinCare } from '../../utils/axios-instance';
import { toast } from 'react-toastify';
import CommonTable from '../../components/common/CommonTable';
import { setLoader } from '../../redux/actions/appActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';

const SellerProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state)=> state.role)
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [productIdToDelete, setProductIdToDelete] = useState(null); 

  const name = seller.name.toUpperCase()

  const fetchData = async () => {
    try {
      const productData = await getSkinCare();
      const productsToSellIds = seller.productsToSell;
      const filteredProducts = productData.data.filter((product) =>
        productsToSellIds.includes(product.id)
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  const productsArray = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'brand', label: 'Brand' },
    { key: 'stock', label: 'Stock' },
    { key: 'category', label: 'Category' },
    { key: 'rating', label: 'Rating' },
    { key: 'update', label: 'Update' },
    { key: 'delete', label: 'Delete' }
  ];

  const handleDelete = async (prodId) => {
    setProductIdToDelete(prodId); 
    setShowModal(true); 
  };

  const deleteProductById = async () => {
    dispatch(setLoader(true));
    const { success, error, data } = await DeleteSkinCare(productIdToDelete);
    if (success) {
      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== productIdToDelete)
      );
      toast.success('Deleted Successfully');
      dispatch(setLoader(false));
    } else {
      toast.error('Error in deleting');
    }
    setShowModal(false);
  };

  const handleUpdate = async (prodId) => {
    navigate(`/seller-update-product/${prodId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl mt-2">{name}'s Products</h1>
      <button
        className="bg-[#D88552] py-2 px-4 rounded"
        onClick={() => navigate('/seller-add-products')}
      >
        ADD PRODUCT
      </button>
      <CommonTable
        data={products}
        headers={productsArray}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />

      <ConfirmDeleteModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={deleteProductById} 
        itemId={productIdToDelete}
      />
    </div>
  );
};

export default SellerProducts;
