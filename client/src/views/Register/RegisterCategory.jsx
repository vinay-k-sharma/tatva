import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getCategories,addCategory, updateCategoryFromAdmin } from '../../utils/axios-instance';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoader } from "../../redux/actions/appActions";
import Loader from "../../components/common/Loader";
import { CategorySchema, ProductSchema } from '../../schemas';

const RegisterCategory = ({categoryData}) => {
  const navigate = useNavigate();
  const [categories,setCategories] = useState([])
  const { isAuth } = useSelector((state) => state.role);
  const { loader } = useSelector((state) => state.app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        if (response.success) {
          setCategories(response.data);
        } else {
          console.error("Failed to fetch the Products Data", response.error);
        }
      } catch (error) {
        console.error("Error while Fetching products", error);
      }
    };

    fetchData();
  }, []);
  async function onSubmit(values) {
    console.log("inside onsubmit")
    const { name } = values;
    if(categoryData){
        const {success,data,error} = await updateCategoryFromAdmin(categoryData?.id,
        {
            name:values.name.trim(),
        })
        if(success){
            toast.success("updation successfull")
            navigate('/admin')
        }
        else{
            toast.error("Failed to update")
        }
    }
    let categoryObj = {
      id:
        categories.length !== 0
          ? (parseInt(categories[categories.length - 1].id) + 1).toString()
          : "1",
      name: name.trim(),
    };
    try {
      const { success, error } = await addCategory(categoryObj);
      if (success) {
        navigate('/admin-categories');
        toast.success('Category added successfully');
      } else {
        toast.error(error ? error.message : 'Error registering category');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error registering category');
    }
  }
  console.log(categoryData.name)

  const initialValuesCategories = {
    name: categoryData?.name ? categoryData.name : "",
  };
  

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: initialValuesCategories,
    validationSchema: CategorySchema,
    onSubmit,
  });


  if (loader) {
    return <Loader />;
  }

  return (
    <div className="lg: m-10">
      <div>
        <h3 className="text-center text-3xl font-bold">
          Register Category
        </h3>
        <div>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
          >
            <div className="flex flex-col">
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                id="name"
                placeholder="Product Name"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>




            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="mt-5 w-30 rounded-md bg-[#D88552] p-2 text-center font-semibold text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCategory;
