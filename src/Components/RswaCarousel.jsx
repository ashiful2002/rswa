import Carousel from "react-bootstrap/Carousel";

import Slider1 from "../assets/Slider1.jpg";
import Slider2 from "../assets/Slider2.jpg";
import Slider3 from "../assets/Slider3.jpg";
import Slider4 from "../assets/Slider4.jpg";

import { sliderImage } from "../constants";

function NoTransitionExample() {
  return (
    <div className=" container mx-auto">
      <Carousel>
        {sliderImage &&
          sliderImage.map((item) => {
            <Carousel.Item key={item.id}>
              <img src={item.src} alt="adsf" />
            </Carousel.Item>;
          })}
      </Carousel>
    </div>
  );
}

export default NoTransitionExample;
