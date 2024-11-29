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
import PageTitle from "../../Components/PageTitle";
const BsBusInfo = () => {
  return (
    <div className="grid-cols-3 gap-3 md:grid">
      <div>
        <PageTitle heading="Rifat paribahan" className="bg-sky-500" />

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
            <InfoAsMap item={{ ...item, index }} index={index} />
          ))}
        </Table>
      </div>
      <div>
        <PageTitle heading="poly paribahan" className="bg-orange-500" />

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
        <PageTitle
          heading=" ayesha paribahan"
          className="bg-gradient-to-r from-sky-500 to-orange-500"
        />

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
        <PageTitle heading="jony sami" className="bg-pink-500" />

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
