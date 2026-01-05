import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageTitle from "./Components/PageTitle";
import Slider from "./Pages/Home/Slider";
import Committee from "./Pages/Home/Committee";
const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto sm:w-11/12">
        <PageTitle title="Home" heading="home page" />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded border shadow-sm">
            {/* <h3 className="text-center capitalize text-neutral-600">
              featured images
            </h3> */}
            <div>
              <Slider />
            </div>
          </div>

          <div>{/* <Committee /> */}</div>
          <div>
            <button
              className="btn btn-success"
              onClick={() => navigate("/blood")}
            >
              Go Blood Bank
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
