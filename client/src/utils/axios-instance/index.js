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
        data : res.data
      }
    }
    catch(error){
      return {
        data:[],
        error: error.message
      }
    }
  }
  export const addSkinCare = async (product) => {
    try {
      const res = await API.post("skinCare_products", product);
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
  export const DeleteSkinCareById = async (id) => {
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