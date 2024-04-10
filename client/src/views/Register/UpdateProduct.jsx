import { useEffect, useState } from "react";
import { Formik,Form } from "formik";
import { getSkinCareById, updateSkinCare } from "../../utils/axios-instance";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ProductSchema } from "../../schemas";
const UpdateProduct = () => {
  const { prodId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {seller} = useSelector((state) => state.role)
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getSkinCareById(prodId);
        if (response.success) {
          setProduct(response.data);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error while fetching product", error);
      }
    };

    fetchProduct();
  }, [prodId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      const updatedProduct = {
        ...product,
      };
      const { success, error } = await updateSkinCare(product);

      if (success) {
        seller ? navigate("/seller-products") : navigate("/admin-products");
        toast.success("Product updated successfully");
      } else {
        console.error("Error updating product:", error);
        toast.error("Problem updating product, Please try after some time!");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  if (!product) {
    return (
      <div className="w-[min(90%,700px)] text-center mx-auto">
        <div className="text-lg md:text-xl lg:text-2xl mt-14">
          Problem fetching product details, Please try after some time!
        </div>
      </div>
    );
  }

  return (
    <>
   
        <h1 className="text-center text-2xl font-bold">Update Product</h1>
        <Formik
          initialValues={product}
          onSubmit={handleSubmit}
          validationSchema={ProductSchema}
        >
          <div>
            <Form className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
              <div className="flex flex-col">
                <label htmlFor="name">Product Name</label>

                <input
                  type="text"
                  id="name"
                  placeholder="Product Name"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  name="name"
                  value={product.name}
                  onChange={handleChange}

                />

                
              </div>

              <div className="flex flex-col">
                <label htmlFor="description">Short Description</label>

                <input
                  type="text"
                  id="description"
                  placeholder="Product Description"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  name="description"
                  value={product.description}
                  onChange={handleChange}

                />
              
              </div>

             

              <div className="flex flex-col">
                <label htmlFor="price">Price</label>

                <input
                  type="price"
                  id="price"
                  placeholder="Product Price"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
         
                />
             
              </div>

              <div className="flex flex-col">
                <label htmlFor="discount">Discount</label>

                <input
                  type="text"
                  id="discount"
                  placeholder="Discount"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
             
                />
                
              </div>

              <div className="flex flex-col">
                <label htmlFor="brand">Brand</label>

                <input
                  type="text"
                  id="brand"
                  placeholder="Brand Name"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
       
                />
               
              </div>
              <div className="flex flex-col">
                <label htmlFor="category">Category</label>

                <input
                  type="text"
                  id="category"
                  placeholder="Category Name"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
       
                />
               
              </div>
              <div className="flex flex-col">
                <label htmlFor="sub_category">Sub_Category</label>

                <input
                  type="text"
                  id="sub_category"
                  placeholder="Sub_Category Name"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  name="sub_category"
                  value={product.sub_category}
                  onChange={handleChange}
       
                />
               
              </div>
              <div className="flex flex-col">
                <label htmlFor="thumbnail">Thumbnail</label>

                <input
                  type="text"
                  id="thumbnail"
                  placeholder="Thumbnail URL"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                  name="thumbnail"
                  value={product.thumbnail}
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
                <button
                  type="button"
                  className="mt-5 w-30 rounded-md bg-[#D88552] p-2 text-center font-semibold text-white"
                  onClick={() => navigate("/admin-products")}
                >
                  BACK
                </button>
                
              </div>
            </Form>
          </div>
        </Formik>
     
    </>
  );
};

export default UpdateProduct;
