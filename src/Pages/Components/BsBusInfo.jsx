import React from "react";
import { Table } from "react-bootstrap";
import {
  ayeshaInfo,
  chattagtamExpInfo,
  polyInfo,
  rifatInfo,
  siamInfo,
} from "../../constants";
import InfoAsMap from "./InfoAsMap";
const BsBusInfo = () => {
  return (
    <div className="grid-cols-3 gap-3 md:grid">
      <div>
        <h2 className="pageTitle bg-sky-400">rifat paribahan</h2>
        <Table
          striped
          bordered
          hover
          className="capitalize shadow shadow-sky-400"
        >
          <thead>
            <tr>
              <th>Counter</th>
              <th>Number</th>
            </tr>
          </thead>
          {rifatInfo.map((item, index) => (
            <InfoAsMap item={item} index={index} />
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
              <InfoAsMap item={item} index={index} />
            </>
          ))}
        </Table>
      </div>
      <div id="siamInfo">
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
              <InfoAsMap item={item} index={index} />
            </>
          ))}
        </Table>
      </div>
      <div id="chattagtamExpInfo">
        <h2 className="pageTitle bg-sky-700">chattagram express</h2>
        <Table striped bordered hover className="capitalize">
          <thead>
            <tr>
              <th>Counter</th>
              <th>Number</th>
            </tr>
          </thead>
          {chattagtamExpInfo.map((item, index) => (
            <>
              <InfoAsMap item={item} index={index} />
            </>
          ))}
        </Table>
      </div>
      <div id="ayeshainfo">
        <h2 className="pageTitle bg-gradient-to-r from-sky-500 to-orange-500">
          ayesha paribahan
        </h2>
        <Table striped bordered hover className="capitalize">
          <thead>
            <tr>
              <th>Counter</th>
              <th>Number</th>
            </tr>
          </thead>
          {ayeshaInfo.map((item, index) => (
            <>
              <InfoAsMap item={item} index={index} />
            </>
          ))}
        </Table>
      </div>
      <div id="jonySami">
        <h2 className="pageTitle bg-pink-500">jony sami</h2>
        <Table striped bordered hover className="capitalize">
          <thead>
            <tr>
              <th>Counter</th>
              <th>Number</th>
            </tr>
          </thead>
          {ayeshaInfo.map((item, index) => (
            <>
              <InfoAsMap item={item} index={index} />
            </>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default BsBusInfo;
