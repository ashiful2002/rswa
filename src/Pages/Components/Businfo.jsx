import React from "react";
import { Table } from "antd";
import { busData } from "../../constants";

const Businfo = () => {
  return (
    <>
      <div>
        <h5 className="h5 pageTitle text-white mt-4">common buses numbers of rowmary</h5>

        <Table
          className="capitalize"
          dataSource={busData}
          columns={[
            {
              title: "S. N.",
              dataIndex: "id",
            },
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Counter",
              dataIndex: "counter",
            },
            {
              title: "Number",
              dataIndex: "phoneNumber",
            },
          ]}
        ></Table>
        <div>
          
        </div>
      </div>
    </>
  );
};

export default Businfo;
