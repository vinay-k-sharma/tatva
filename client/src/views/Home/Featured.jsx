import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../../components/common/Card';
import { Link } from 'react-router-dom';
const Featured = ({ data, handleLikesDislikes, isProductLiked }) => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, slidesToSlide: 1 }, 
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 1 }, 
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 } 
  };
  const filteredData = data.filter(item => item.total_sold > 30);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 mt-10">
          <div className="border-b-2 border-t-2 border-amber-800 py-2">
            <h1 className="text-amber-800 text-center text-2xl">Featured Collection</h1>
          </div>
        </div>
      </div>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000} 
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={"desktop"} 
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {filteredData.map((item, index) => (
          <Card
            key={index}
            data={[item]}
            handleLikesDislikes={handleLikesDislikes}
            isProductLiked={isProductLiked}
            isInCarousel={true}
          />
        ))}
      </Carousel>
      <Link to={'/best-sellers'} className=''>See All</Link>
    </div>
  );
};

export default Featured;