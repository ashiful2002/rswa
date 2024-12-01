import React from "react";

import { polyInfo, rifatInfo, siamInfo } from "../../constants";
import { Table } from "antd";

const IndivisualBus = () => {
  // console.log();

  return (
    <div>
      <div>
        <h1 className="h1 pageTitle text-white">indivisualy bus information</h1>
      </div>
      <div className="mt-4 justify-between md:flex">
        <div className="">
          <h4 className="h4 pageTitle text-white">Rifat paribahan</h4>
          <Table
            pagination={false}
            className="capitalize"
            dataSource={rifatInfo}
            columns={[ 
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
          <h4 className="h4 pageTitle text-white">poly paribahan</h4>
          <Table
            pagination={false}
            className="capitalize"
            dataSource={polyInfo}
            columns={[
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
          <h4 className="h4 pageTitle text-white">siam enterprise</h4>
          <Table
            pagination={false}
            className="capitalize"
            dataSource={siamInfo}
            columns={[
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
    </div>
  );
};

export default IndivisualBus;
