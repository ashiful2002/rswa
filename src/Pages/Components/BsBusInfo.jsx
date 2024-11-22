import React from "react";
import { Table } from "react-bootstrap";
import {  polyInfo, rifatInfo, siamInfo } from "../../constants";
const BsBusInfo = () => {
  return (
    <>
      <div>
        <h2 className="pageTitle bg-sky-400">rifat paribahan</h2>
        <Table striped bordered hover className="capitalize">
          <thead>
            <tr>
              <th>Counter</th>
              <th>Number</th>
            </tr>
          </thead>
          {rifatInfo.map((item, index) => (
            <>
              <tbody key={index}>
                <tr>
                  <td>{item.counter}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              </tbody>
            </>
          ))}
        </Table>
      </div>
      <div>
        <h2 className="pageTitle bg-orange-500">poly paribahan</h2>
        <Table striped bordered hover className="capitalize">
          <thead>
            <tr>
              <th>Counter</th>
              <th>Number</th>
            </tr>
          </thead>
          {polyInfo.map((item, index) => (
            <>
              <tbody key={index}>
                <tr>
                  <td>{item.counter}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              </tbody>
            </>
          ))}
        </Table>
      </div>
      <div>
        <h2 className="pageTitle bg-yellow-500">siam enterprise</h2>
        <Table striped bordered hover className="capitalize">
          <thead>
            <tr>
              <th>Counter</th>
              <th>Number</th>
            </tr>
          </thead>
          {siamInfo.map((item, index) => (
            <>
              <tbody key={index}>
                <tr>
                  <td>{item.counter}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              </tbody>
            </>
          ))}
        </Table>
      </div>
    </>
  );
};

export default BsBusInfo;
