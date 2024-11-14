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
   < PageTitle title = "RSWA | home"/>
   
    <div className="container mx-auto h-screen">
      <h1 className="pageTitle">Home Page</h1>
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
