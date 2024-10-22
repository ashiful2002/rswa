import React, { useState } from "react";
import { Input, Table } from "antd";

import { bloodGroupData } from "../constants/BloodGropuData";

const SearchTable = () => {
  const [searchedValue, setsearchBloogG] = useState("");
;
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
          dataSource={bloodGroupData}
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
