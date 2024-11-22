import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import PageTitle from "../../Components/PageTitle";
import BgFormAnt from "../../Components/Form/BgFormAnt";
import GForm from "./GForm";
import { Alert } from "antd";

const GFormBloog = () => {
  const navigate = useNavigate();
  const onclose = (e) => {
    console.log("i am clossed");
    // alert("sure to close form?");
  };
  return (
    <div className="container mx-auto flex flex-col items-center">
      <PageTitle title="Form" heading="Blood Group Form " />
      <div className="flex flex-col items-center justify-center">
        <div className="me-25">
          {/* <Button
            className="mb-2"
            variant="success"
            onClick={() => navigate("/blood")}
          >
            <IoMdArrowRoundBack className="font-extrabold" />
          </Button> */}
        </div>
        <div className="container mx-auto">
          <Alert
            message="Fill the to add your  blood group data"
            closable
            type="success"
            className="p-3"
            onClose={onclose}
          ></Alert>
          <p className="rounded bg-blue-400 p-2 capitalize text-white">
            Fill the to add your
            <span className="mx-2 rounded bg-yellow-300 px-2 font-semibold uppercase text-red-500">
              blood group data
            </span>{" "}
            on this website
          </p>
          <GForm />
          <BgFormAnt />
          <p className="text-muted text-sm">
            Your data will be added on website as soon as possible...
          </p>
        </div>
      </div>{" "}
      {/* <FormFace /> */}
      {/* < BgFormAnt /> */}
      {/* < BgForm1/> */}
    </div>
  );
};

export default GFormBloog;
