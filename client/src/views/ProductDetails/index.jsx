import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../../utils/axios-instance";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const params = useParams();
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

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  return (
    <div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
               
              {productData.images && productData.images.length > 0 ? (
                <div className="max-w-4xl max-h-screen">
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  responsive={responsive}
                  ssr={true}
                  infinite={false}
                  autoPlay={true}
                  autoPlaySpeed={10000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={"desktop"} // i will dynamically set it using props based on client's device
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {productData.images.map((image, index) => (
                    <img key={index} src={image} alt={`Product Image ${index}`} className="w-full" />
                  ))}
                </Carousel>
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
                    <span className="font-bold text-indigo-600 text-3xl">{productData.price}</span>
                  </div>
                </div>
                {productData.discount > 0 && (
                  <div className="flex-1">
                    <p className="text-green-500 text-xl font-semibold">Save {productData.discount}%</p>
                    <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                  </div>
                )}
              </div>
              <p className="text-gray-500">{productData.description}</p>
              <div className="flex py-4 space-x-4">
                <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-[#D88552] hover:bg-indigo-500 text-white">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
