import React from "react";
import SearchTable from "../Components/SearchTable";
import { Button } from "react-bootstrap";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";

const Blood = () => {
  const navigate = useNavigate()
  const handleNavigate=()=>{
    navigate("/bgForm")
  }
  return (
    <div className="container mx-auto">
      <div>
        <SearchTable />
      </div>

     <div className="text-center my-4">
     <Button onClick={handleNavigate}>Add Your Data</Button>
     </div>
      {/* add google form */}
    </div>
  );
};

export default Blood;
