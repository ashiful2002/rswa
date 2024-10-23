import React, { useState } from "react";
import { Input, Table } from "antd";

import { bloodGroupData } from "../constants/BloodGropuData";

const SearchTable = () => {
  const [searchedValue, setsearchBloogG] = useState("");
  return (
    <div className="container  mx-auto ">
      <h1 className="pageTitle">Blood Group</h1>
      <div className=" h-[90vh]">
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
        <div className="overflow-scroll">
          <Table
            dataSource={bloodGroupData}
            columns={[
              {
                title: "Name",
                dataIndex: "Name",
              },
              {
                title: "Bloog Group",
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
                dataIndex: "Permanent_Address ",
              },
            ]}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default SearchTable;
