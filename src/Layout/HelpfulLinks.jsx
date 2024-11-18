import React from "react";
import { FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const HelpfulLinks = () => {
 
  return (
    <div>
      <div>
        <h6 className="h6 my-4 text-sm font-thin">Helpful Numbers</h6>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex items-center justify-center">
          <p>police:</p>
          <p>999</p>
        </div>
        <div className="flex items-center justify-center">
          <p>hospital:</p>
          <p>0123456789</p>
        </div>
        <div className="flex items-center justify-center">
          <p>fire service:</p>
          <p>0123456789</p>
        </div>
        <p>
            <Link to="/otherLinks" className="mx-2 text-green-500">other importent numbers</Link>
        
           
        </p>
      </div>
    </div>
  );
};

export default HelpfulLinks;
