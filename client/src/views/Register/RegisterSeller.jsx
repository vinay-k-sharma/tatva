import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getSellers, addSeller } from "../../utils/axios-instance";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import { sellerSchema } from "../../schemas";
import { setRole } from "../../redux/actions/roleAction";

const RegisterSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [sellers, setSellers] = useState([]);
  const { loader } = useSelector((state) => state.app);
  const { isAuth } = useSelector((state) => state.role);

  const fetchSellers = async () => {
    try {
      const response = await getSellers();
      if (response.success) {
        setSellers(response.data);
      } else {
        console.error("Failed to fetch the Sellers Data", response.error);
      }
    } catch (error) {
      console.error("Error while Fetching sellers", error);
    }
  };
  useEffect(() => {
    fetchSellers();
  }, []);

  async function onSubmit(values) {
    console.log("inside onsubmit");
    const { name, organization, brand, email, password } = values;

    let sellerObj = {
      id:
        sellers.length !== 0
          ? (parseInt(sellers[sellers.length - 1].id) + 1).toString()
          : "1",
      name: name.trim(),
      organization: organization.trim(),
      brand: brand.trim(),
      email,
      password,
      sellerProductsId: [],
    };

     try {
      await addSeller(sellerObj);
      handleReset();
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  
  const initialValuesSeller = {
    name: "",
    organization: "",
    brand: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: initialValuesSeller,
      validationSchema: sellerSchema,
      onSubmit,
    });

    useEffect(() => {

        isAuth ? navigate("/") : null;
    
        (async () => {
          const {
            success: sellerSuccess,
            data: sellersData,
            error: sellerError,
          } = await getSellers();
          setSellers(sellersData);
        })();
      }, []);

  return (
    <div className="lg: m-10">
      <div>
        <h3 className="text-center text-3xl font-bold mb-2">Register Seller</h3>
        <div>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
          >
            <div className="flex flex-col">
              <label htmlFor="name">Seller Name</label>
              <input
                type="text"
                id="name"
                placeholder="Seller Name"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name ? (
                <p className="text-[14px] text-red-700">{errors.name}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                id="organization"
                placeholder="Organization Name"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="organization"
                value={values.organization}
                onChange={handleChange}
              />
              {touched.organization && errors.organization ? (
                <p className="text-[14px] text-red-700">{errors.organization}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="brand">Brand</label>
              <textarea
                id="brand"
                placeholder="Brand Name"
                className="mt-3 h-12 w-full rounded-md bg-gray-100 px-3"
                name="brand"
                value={values.brand}
                onChange={handleChange}
              />
              {touched.brand && errors.brand ? (
                <p className="text-[14px] text-red-700">{errors.brand}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {touched.email && errors.email ? (
                <p className="text-[14px] text-red-700">{errors.email}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {touched.password && errors.password ? (
                <p className="text-[14px] text-red-700">{errors.password}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="cpassword"
                value={values.cpassword}
                onChange={handleChange}
              />
              {touched.cpassword && errors.cpassword ? (
                <p className="text-[14px] text-red-700">{errors.cpassword}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
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

export default RegisterSeller;
