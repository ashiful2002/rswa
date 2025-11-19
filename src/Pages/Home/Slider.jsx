import React from "react";
import { Carousel } from "react-bootstrap";
import { sliderDetails } from "../../constants";

const Slider = () => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Carousel interval={5000} pause={true}>
        {sliderDetails?.map((item) => (
          <Carousel.Item key={item.id}>
            <div className="w-full">
              <img
                src={item.url}
                alt={item.title}
                className="h-[220px] w-full rounded-lg object-cover sm:h-[300px] md:h-[400px] lg:h-[500px]"
              />
            </div>

            <Carousel.Caption className="rounded-md bg-black/40 p-2 backdrop-blur-sm">
              <h3 className="text-sm font-medium sm:text-lg">{item.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
