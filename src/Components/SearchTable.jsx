import React, { useState } from "react";
import { Input, Table } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";

import { bloodGroupData } from "../constants/BloodGropuData";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";

const SearchTable = () => {
  const navigate = useNavigate();
  const [searchedValue, setsearchBloogG] = useState("");
  return (
    <div className="container mx-auto">
      
      {/* <div className="flex items-center justify-between">
        <Button
          className="mb-2"
          variant="success"
          onClick={() => navigate("/")}
        >
          {" "}
          <IoMdArrowRoundBack className="font-extrabold" />
        </Button>
        <Button
          className="mb-2"
          onClick={() => navigate("/bgForm")}
          
          variant="success"
        >
          {" "} 
          <IoMdArrowRoundForward className="font-extrabold" /> 
        </Button>
      </div> */}
      <div className=" ">
        <Input.Search
          className=""
          placeholder="search by blood group    ( EG : ' A(+) ')"
          onSearch={(value) => {
            setsearchBloogG(value);
          }}
          onChange={(e) => {
            setsearchBloogG(e.target.value);
          }}
        ></Input.Search>
        <div className="h-[90vh] overflow-scroll">
          <Table
            dataSource={bloodGroupData}
            columns={[
              {
                title: "Name",
                dataIndex: "Name",
              },
              {
                title: "Blood Group",
                dataIndex: "Blood_Group",
                filteredValue: [searchedValue],
                onFilter: (value, record) => {
                  return (
                    String(record.Blood_Group)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.Name)
                      .toLowerCase()
                      .includes(value.toLowerCase())
                  );
                },
              },
              {
                title: "Contact",
                dataIndex: "Phone_Number",
              },
              {
                title: "SSC Batch",
                dataIndex: "SSC_Batch",
              },
              {
                title: "Present Address",
                dataIndex: "Present_Address",
              },
              {
                title: "Permanent Address",
                dataIndex: "Permanent_Address",
              },
            ]}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default SearchTable;
