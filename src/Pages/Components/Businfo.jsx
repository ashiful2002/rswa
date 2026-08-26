import React from "react";
import { Table } from "antd";
import { busData } from "../../constants";
import PageTitle from "../../Components/PageTitle";

const Businfo = () => {
  return (
    <>
      <div>
        <PageTitle
          heading="common buses numbers of rowmari"
          className="bg-red-600 text-[24px]"
        />

        <Table
          className="capitalize"
          dataSource={busData}
          columns={[
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
        <div></div>
      </div>
    </>
  );
};

export default Businfo;
