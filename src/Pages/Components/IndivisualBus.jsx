import React from "react";

import { polyInfo, rifatInfo, siamInfo } from "../../constants";
import { Table } from "antd";
const IndivisualBus = () => {
  return (
    <>
      <div className="md:flex items-center justify-around">
        <div >
          <h4 className="h4 pageTitle text-white">Rifat info</h4>
          <Table
            className="capitalize"
            dataSource={rifatInfo}
            columns={[
              {
                title: "S. N.",
                dataIndex: "id",
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
        </div>
        <div>
          <h4 className="h4 pageTitle text-white">poly info</h4>
          <Table
            className="capitalize"
            dataSource={polyInfo}
            columns={[
              {
                title: "S. N.",
                dataIndex: "id",
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
        </div>
        <div>
          <h4 className="h4 pageTitle text-white">siam info</h4>
          <Table
            className="capitalize"
            dataSource={siamInfo}
            columns={[
              {
                title: "S. N.",
                dataIndex: "id",
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
        </div>
      </div>
    </>
  );
};

export default IndivisualBus;
