import React from "react";
import { Carousel } from "react-bootstrap";
import { sliderDetails } from "../../constants";

const Slider = () => {
  return (
    <div className="mx-auto ">
    
      {/* container with fixed max width */}
      <Carousel>
        {sliderDetails &&
          sliderDetails.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                src={item.url}
                alt={item.title}
                className="h-[400px] w-full object-cover" // fixed height & full width
              />
              <Carousel.Caption>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
