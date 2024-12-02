import React from "react";
import { Carousel } from "react-bootstrap";
import { sliderDetails } from "../../constants";
const Slider = () => {
  return (
   <div>
     {
     <div>
    <Carousel fade>
    {sliderDetails && sliderDetails.map((item) => (
        <Carousel.Item key={item.id}>
          <img width="w-full overflow-none" src={item.url} alt={item.title} />
          {/* <Carousel.displayName >{item.title}</Carousel.displayName> */}
          <Carousel.displayName>{item.title}</Carousel.displayName>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
    }
   </div>
  );
};

export default Slider;


