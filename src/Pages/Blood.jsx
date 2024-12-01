import React from "react";
import SearchTable from "../Components/SearchTable";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageTitle from "../Components/PageTitle";

const Blood = () => {
  const navigate = useNavigate()
  const handleNavigate=()=>{
    navigate("/bgForm")
  }
  return (
    <>
    
   
    <div className="container mx-auto">
    < PageTitle title = "Blood" heading="RSWA virtual Blood bank"/>
      <div>
        <SearchTable />
      </div>

     <div className="text-center my-4">
     <Button onClick={handleNavigate}>Add Your Data</Button>
     </div>
      {/* add google form */}
    </div>
    </>
  );
};

export default Blood;
