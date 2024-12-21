import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { bloodGroupData } from "../constants/BloodGropuData";
import axios from "axios";
import { MdBloodtype,MdOutlineBloodtype  } from "react-icons/md";

const SearchTable = () => {
  const [searchedValue, setsearchBloogG] = useState("");

  const [users, setUsers] = useState([]);

  const getAllData = async () => {
    const response = await axios.get("http://localhost:3000/bloodGroupData");
    console.log(response.data);
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="">
          <Input.Search
            prefix={
              <MdOutlineBloodtype
                size={30}
                className="-ml-3"
                style={{ color: "rgba(0,0,0,.25)" }}
              />
            }
            
            className="mb-2"
            size="large"
            placeholder="Search by blood group   -eg : 'A(+)'"
            onSearch={(value) => {
              setsearchBloogG(value);
            }}
            onChange={(e) => {
              setsearchBloogG(e.target.value);
            }}
          ></Input.Search>

          <div className="h-[90vh] overflow-scroll">
            <Table
              dataSource={bloodGroupData}
              columns={[
                {
                  title: "Name",
                  dataIndex: "Name",
                },
                {
                  title: "Blood Group",
                  dataIndex: "Blood_Group",
                  filteredValue: [searchedValue],
                  onFilter: (value, record) => {
                    return (
                      String(record.Blood_Group)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.Name)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Contact",
                  dataIndex: "Phone_Number",
                },
                {
                  title: "SSC Batch",
                  dataIndex: "SSC_Batch",
                },
                {
                  title: "Present Address",
                  dataIndex: "Present_Address",
                },
                {
                  title: "Permanent Address",
                  dataIndex: "Permanent_Address",
                },
              ]}
            ></Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchTable;
