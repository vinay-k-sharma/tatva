import axios from 'axios'
import { WEBAPI_ENDPOINT } from '../../config'
export const API = axios.create({
    baseURL:WEBAPI_ENDPOINT,
    timeout: 1000000,
    timeoutErrorMessage: "Server timeout",
})
export const registerUser = async(userObj) => {
    try{
        const res = await API.post("users",userObj)
        return{
            success:true,
            data:res.data,
            error:null
        }
    }
    catch{
        return{
            success:false,
            data:[],
            error:error.message,
        }
    }
}
export const getUsers = async () => {
    try {
      const res = await API.get("users");
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }
  };
  export const updateUserFromAdmin = async (id, userData) => {
    try {
        const res = await API.patch(`/users/${id}`, userData);
        return {
            success: true,
            data: res.data,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: [],
            error: error.message,
        };
    }
  };
  export const getUserById = async (id) => {
    try {
      const res = await API.get(`users/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const deleteUser = async (id) => {
    try {
      const res = await API.delete(`users/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const updateUser = async (updatedUser) => {
    try {
      const res = await API.patch(`users/${updatedUser.id}`, updatedUser);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }
  };
  export const getSkinCare = async () => {
    try {
      const res  = await API.get('skinCare_products')
      return {
        success : true,
        data : res.data,
        error: res.error
      }
    }
    catch (error) {
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }
  }
  export const addSkinCare = async (productObj) => {
    try {
      const res = await API.post("skinCare_products", productObj);
      return {
        success: true,
        data: res.data,
        error: res.error
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const getSkinCareById = async (id) => {
    try {
      const res = await API.get(`skinCare_products/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const DeleteSkinCare = async (id) => {
    try {
      const res = await API.delete(`skinCare_products/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const updateSkinCare = async (product) => {
    try {
      const res = await API.patch(`skinCare_products/${product.id}`, product);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  
  
  export const getUserOrders = async () => {
    try {
      const res = await API.get('orders')
      return {
        success:true,
        data:res.data,
        error:null
      }
    }
    catch(error){
      console.log(error)
    }
  }

 export  const orderEntry = async (obj) => {
    try{
      const res = await API.post('orders',obj)
      return{
        success:true,
        data:res.data
      }
    }
    catch(error){
      console.log(error)
    }
  }
  export const updateOrderFromSeller = async (orderId, orderData) => {
    try {
        const res = await API.patch(`/orders/${orderId}`, orderData);
        return {
            success: true,
            data: res.data,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: [],
            error: error.message,
        };
    }
  };
  export const getCategories = async () => {
    try {
      const res = await API.get("categories");
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const addCategory = async (categoryObj) => {
    try {
      const res = await API.post("categories", categoryObj);
      return {
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const deleteCategories = async (id) => {
    try {
      const res = await API.delete(`categories/${id}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const getCategoryById = async (categoryId) => {
    try {
      const res = await API.get(`categories/${categoryId}`);
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const updateCategoryFromAdmin = async (categoryId, categoryData) => {
    try {
        const res = await API.patch(`/categories/${categoryId}`, categoryData);
        return {
            success: true,
            data: res.data,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: [],
            error: error.message,
        };
    }
  };
  export const getSellers = async () => {
    try {
      const res = await API.get("sellers");
      return {
        success: true,
        data: res.data,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }
  };
  export const addSeller = async (sellerObj) => {
    try {
      const res = await API.post("sellers", sellerObj);
      return {
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
  export const updateSellerProducts = async (seller, newProductId) => {
    try {
      const sellerProducts = seller.productsToSell;
      const updatedSellersProducts = [...sellerProducts, newProductId];
      const newSellerObj = {
        ...seller,
        productsToSell: updatedSellersProducts,
      };
      const res = await API.put(`sellers/${seller.id}`, newSellerObj);
  
      return {
        success: true,
        data: newSellerObj,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
