import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageTitle from "./Components/PageTitle";
import Slider from "./Pages/Home/Slider";
import Committee from "./Pages/Home/Committee";

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container mx-auto">
        <PageTitle title="Home" heading="home page" />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded border p- shadow-sm">
            <h3 className="text-center capitalize text-neutral-600">
              featured images
            </h3>
            <Slider />
          </div>

          < Committee />
          <div>
            <Button onClick={() => navigate("/blood")}> Go Blood Bank</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
