import React from "react";
import { Table } from "react-bootstrap";
import { busDataMap } from "../../constants";
const BsBusInfo = () => {
  return (
    <>
      <>
        <h2 className="pageTitle">rifat</h2>
        <Table striped bordered hover className="capitalize">
          <thead>
            <tr>
              <th>Counter</th>
              <th>Number</th>
            </tr>
          </thead>
          {busDataMap[0].rifat.map((item, index) => {
            return (
              <>
                <tbody key={index}>
                  <tr>
                    <td>{item.counter}</td>
                    <td>{item.phoneNumber}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </Table>
      </>
    </>
  );
};

export default BsBusInfo;
