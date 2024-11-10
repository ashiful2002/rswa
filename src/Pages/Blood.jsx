import React from "react";
import SearchTable from "../Components/SearchTable";
import { Button } from "react-bootstrap";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";

const Blood = () => {
  const navigate = useNavigate()
  const handleNavigate=()=>{
    navigate("/addBloodGroupInfo")
  }
  return (
    <div className="container mx-auto">
      <div>
        <SearchTable />
      </div>

      <Button onClick={handleNavigate}>Add Your Data</Button>
      {/* add google form */}
    </div>
  );
};

export default Blood;
