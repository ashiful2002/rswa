import React from "react";
import { Table } from "antd";
import { busData } from "../../constants";
const Businfo = () => {
  return (
    <>
      <div>
        <h6 className="h6 pageTitle text-white">common buses numbers of rowmary</h6>

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
