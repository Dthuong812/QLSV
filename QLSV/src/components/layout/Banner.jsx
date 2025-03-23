import React from "react";
import { Carousel } from "antd";
import "./Banner.css";
const images = [
  "https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742317402143-449e8b4cbf91?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742268582642-c28247e00a1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Banner = () => {
  
  return (
    <div className="container-fluid px-0">
      <Carousel autoplay>
        {images.map((img, index) => (
          <div key={index} className="banner-item">
            <img src={img} alt={`Banner ${index + 1}`} className="img-fluid" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
