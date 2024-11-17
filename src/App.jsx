import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageTitle from "./Components/PageTitle";
const App = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/blood");
  };
  return (
    <>
   
   
    <div className="container mx-auto h-screen">
    < PageTitle title = "Home" heading="home page"/>
      <div className="allCenter flex h-screen flex-col">
        <div>
          <Button onClick={handleNavigate}> Go Blood Bank</Button>
        </div>

        <div>
          <p className="m-4 text-slate-500">just started working on this...</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
