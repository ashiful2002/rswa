import React from "react";

const InfoAsMap = ({ item, index }) => {
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
};

export default InfoAsMap;
