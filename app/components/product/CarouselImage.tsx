import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { urlApi } from "@/context/urlapi";
const CarouselImage = ({ images }) => {
  return (
    <Carousel width="450" dynamicHeight={true} showArrows={true}>
      {images.map((image) => (
        <img key={image} src={`${urlApi}uploads/${image}`} />
      ))}
    </Carousel>
  );
};

export default CarouselImage;
