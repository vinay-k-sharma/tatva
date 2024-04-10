import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  addSkinCare,
  getSkinCare,
  updateSellerProducts,
} from "../../utils/axios-instance";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import { ProductSchema } from "../../schemas";
import { setRole } from "../../redux/actions/roleAction";

const RegisterProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { seller } = useSelector((state) => state.role);
  const { loader } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSkinCare();
        if (response.success) {
          setProducts(response.data);
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
    try {
      const {
        name,
        description,
        long_description,
        price,
        discount,
        stock,
        brand,
        category,
        sub_category,
        thumbnail,
      } = values;

      const newProduct = {
        id:
          products.length !== 0
            ? (parseInt(products[products.length - 1].id) + 1).toString()
            : "1",
        name: name.trim(),
        description: description.trim(),
        long_description,
        price,
        discount,
        stock,
        brand,
        category,
        sub_category,
        thumbnail,
      };

      const {
        success: addProductSuccess,
        data: addedProductData,
        error: addProductError,
      } = await addSkinCare(newProduct);
      console.log(
        "Add product response:",
        addProductSuccess,
        addedProductData,
        addProductError
      );

      if (!addProductSuccess) {
        throw new Error(`Error adding product: ${addProductError}`);
      }
      if (seller) {
        const {
          success: updateSellerSuccess,
          data: updatedSellerData,
          error: updateSellerError,
        } = await updateSellerProducts(seller, newProduct.id.toString());
        console.log(
          "Update seller response:",
          updateSellerSuccess,
          updatedSellerData,
          updateSellerError
        );

        if (!updateSellerSuccess) {
          throw new Error(
            `Error updating seller's products: ${updateSellerError}`
          );
        }

        dispatch(setRole("seller", updatedSellerData));

        navigate("/seller-products");
      } else {
        navigate("/admin-products");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }
  }

  const initialValuesProducts = {
    name: "",
    description: "",
    long_description: "",
    price: "",
    discount: "",
    stock: "",
    brand: "",
    category: "",
    sub_category: "",
    thumbnail: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: initialValuesProducts,
      validationSchema: ProductSchema,
      onSubmit,
    });

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="lg: m-10">
      <div>
        <h3 className="text-center text-3xl font-bold">Register Product</h3>
        <div>
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
          >
            <div className="flex flex-col">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                placeholder="Product Name"
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
              <label htmlFor="description">Short Description</label>
              <input
                type="text"
                id="description"
                placeholder="Short Description"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              {touched.description && errors.description ? (
                <p className="text-[14px] text-red-700">{errors.description}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="long_description">Long Description</label>
              <textarea
                id="long_description"
                placeholder="Long Description"
                className="mt-2 h-32 w-full rounded-md bg-gray-100 px-3"
                name="long_description"
                value={values.long_description}
                onChange={handleChange}
              />
              {touched.long_description && errors.long_description ? (
                <p className="text-[14px] text-red-700">{errors.long_description}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Price"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
              {touched.price && errors.price ? (
                <p className="text-[14px] text-red-700">{errors.price}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="discount">Discount</label>
              <input
                type="number"
                id="discount"
                placeholder="Discount"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="discount"
                value={values.discount}
                onChange={handleChange}
              />
              {touched.discount && errors.discount ? (
                <p className="text-[14px] text-red-700">{errors.discount}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                placeholder="Stock"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="stock"
                value={values.stock}
                onChange={handleChange}
              />
              {touched.stock && errors.stock ? (
                <p className="text-[14px] text-red-700">{errors.stock}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                placeholder="Brand"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
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
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                placeholder="Category"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="category"
                value={values.category}
                onChange={handleChange}
              />
              {touched.category && errors.category ? (
                <p className="text-[14px] text-red-700">{errors.category}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="sub_category">Sub-Category</label>
              <input
                type="text"
                id="sub_category"
                placeholder="Sub-Category"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="sub_category"
                value={values.sub_category}
                onChange={handleChange}
              />
              {touched.sub_category && errors.sub_category ? (
                <p className="text-[14px] text-red-700">{errors.sub_category}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="thumbnail">Thumbnail Image</label>
              <input
                type="text"
                id="thumbnail"
                placeholder="Thumbnail URL"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                name="thumbnail"
                value={values.thumbnail}
                onChange={handleChange}
              />
              {touched.thumbnail && errors.thumbnail ? (
                <p className="text-[14px] text-red-700">{errors.thumbnail}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className={`mt-5 w-30 rounded-md bg-[#D88552] p-2 text-center font-semibold text-white ${
                  errors.name || errors.password || errors.email
                    ? "cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  errors.name || errors.password || errors.email ? true : false
                }
              >
                Submit
              </button>
              <button
                  type="button"
                  className="mt-5 w-30 rounded-md bg-[#D88552] p-2 text-center font-semibold text-white"
                  onClick={() => navigate("/admin-products")}
                >
                  BACK
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
