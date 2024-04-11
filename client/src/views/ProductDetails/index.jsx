import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../../utils/axios-instance";
import "react-multi-carousel/lib/styles.css";
import MyCarousel from "../../components/common/MyCarousel";
import { ADD } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Description_Component from "../Home/Description_Component";

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const params = useParams();
  const dispatch = useDispatch();
  const productId = params.productID;

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await API.get(`/skinCare_products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getProductDetails();
  }, [productId]);

  const send = (product) => {
    dispatch(ADD(product));
    console.log("added to cart");
    console.log(product.quantity);
    toast.success("Added to Cart");
  };
  return (
    <div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              {productData.images && productData.images.length > 0 ? (
                <div className="max-w-4xl max-h-screen">
                  <MyCarousel>
                    {productData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index}`}
                        className="w-full"
                      />
                    ))}
                  </MyCarousel>
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {productData.name}
              </h2>
              <p className="text-gray-500 text-sm">By {productData.brand}</p>
              <div className="flex items-center space-x-4 my-4">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-indigo-400 mr-1 mt-1">₹</span>
                    <span className="font-bold text-indigo-600 text-3xl">
                      {productData.price}
                    </span>
                  </div>
                </div>
                {productData.discount > 0 && (
                  <div className="flex-1">
                    <p className="text-green-500 text-xl font-semibold">
                      Save {productData.discount}%
                    </p>
                    <p className="text-gray-400 text-sm">
                      Inclusive of all Taxes.
                    </p>
                  </div>
                )}
              </div>
              <p className="text-gray-500">{productData.description}</p>
              <div className="flex py-4 space-x-4">
                <button
                  type="button"
                  className="h-14 px-6 py-2 font-semibold rounded-xl bg-[#D88552] hover:bg-indigo-500 text-white"
                  onClick={() => send(productData)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="inline-block px-4 mt-10 mb-5">
              <div className="border-b border-t border-amber-800 py-2">
                <h1 className="text-amber-800 text-center text-2xl">
                  Product Description
                </h1>
              </div>
            </div>
          </div>
          {productData.long_description}
          <div className="flex flex-col items-center">
            <div className="inline-block px-4 mt-10 mb-5">
              <div className="border-b border-t border-amber-800 py-2">
                <h1 className="text-amber-800 text-center text-2xl">
                  Product Ingredients
                </h1>
              </div>
            </div>
          </div>
          {productData.ingredients}
          <div className="flex flex-col items-center">
            <div className="inline-block px-4 mt-10 mb-5">
              <div className="border-b border-t border-amber-800 py-2">
                <h1 className="text-amber-800 text-center text-2xl">
                  What People Are Saying
                </h1>
              </div>
            </div>
          </div>
          {productData.reviews}
          <div className="flex flex-col items-center">
            <div className="inline-block px-4 mt-10 mb-5">
              <div className="border-b border-t border-amber-800 py-2">
                <h1 className="text-amber-800 text-center text-2xl">
                  WHY YOU’LL LOVE IT
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-5">
          <Description_Component />
          <div className="flex flex-col items-center">
            <div className="inline-block px-4 mt-10 mb-5">
              <div className="border-b border-t border-amber-800 py-2">
                <h1 className="text-amber-800 text-center text-2xl">
                CONSUMER CLAIMS
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-3">
          {productData.consumer_claims }
          <div className="flex flex-col items-center">
            <div className="inline-block px-4 mt-10 mb-5">
              <div className="border-b border-t border-amber-800 py-2">
                <h1 className="text-amber-800 text-center text-2xl">
                DISCLAIMER
                </h1>
              </div>
            </div>
          </div>
          {productData.disclaimer}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
