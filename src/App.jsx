import React from "react";
import NoTransitionExample from "./Components/RswaCarousel.jsx";
import SearchTable from "./Components/SearchTable";
import CustomButton from "./Components/CustomButton";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AntCarousel from "./Components/AntCarousel.jsx";
import RswaCarousel from '../src/Components/RswaCarousel.jsx'
const App = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/blood");
  };
  return (
    <div className="container mx-auto h-screen">
      <div className="allCenter flex flex-col h-screen ">
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
 