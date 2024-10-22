import React, { useState } from "react";
import { Input, Table } from "antd";
// const colDetailse = ;
// const bloodGroupData = ;
const SearchTable = () => {
  const [searchedValue, setsearchBloogG] = useState("");
  //   const handleSearch = () => {
  //     setsearchBloogG(value);
  //   };
  return (
    <div>
      <h1 className="pageTitle">Blood Group</h1>
      <div>
        <Input.Search
          placeholder="search by blood group    (EG:'A+')"
          onSearch={(value) => {
            setsearchBloogG(value);
          }}
          onChange={(e) => {
            setsearchBloogG(e.target.value);
          }}
        ></Input.Search>
        <Table
          dataSource={[
            {
              key: "0",
              name: "Abir",
              BGroup: "B+",
              contact: "01759907907",
            },
            {
              key: "1",
              name: "antor",
              BGroup: "o-",
              contact: "01643565607",
            },
            {
              key: "3",
              name: "Nasim",
              BGroup: "B+",
              contact: "",
            },
            {
              key: "4",
              name: "Utsho",
              BGroup: "A+",
              contact: "01992829099",
            },
          ]}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Bloog Group",
              dataIndex: "BGroup",
              filteredValue: [searchedValue],
              onFilter: (value, record) => {
                return String(record.BGroup)
                  .toLowerCase()
                  .includes(value.toLowerCase());
              },
            },
            {
              title: "Contact",
              dataIndex: "contact",
            },
          ]}
        ></Table>
      </div>
    </div>
  );
};

export default SearchTable;
