import React from "react";
import AntTable from "./Components/AntTable";
import SearchTable from "./Components/SearchTable";
import CustomButton from "./Components/CustomButton";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/blood");
  };
  return (
    <div className="container mx-auto">
      <div className="h-screen allCenter flex flex-col ">
        <div>
          <Button onClick={handleNavigate}> Go Blood Bank</Button>
        </div>
        <div>
          <p className="text-slate-500 m-4">just started working on this...</p>
        </div>
      </div>
    </div>
  );
};

export default App;
