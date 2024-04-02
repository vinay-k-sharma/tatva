import axios from 'axios'

export const API = axios.create({
    baseURL:'http://localhost:3006',
    timeout:5000,
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