import React from "react";
import { Carousel } from "react-bootstrap";
import { sliderDetails } from "../../constants";
const Slider = () => {
  return (
    <>
      <Carousel fade>
      {sliderDetails && sliderDetails.map((item) => (
          <Carousel.Item key={item.id}>
            <img className="rounded shadow" src={item.url} alt={item.title} />
            <Carousel.displayName >{item.title}</Carousel.displayName>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Slider;
