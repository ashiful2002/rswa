import React from "react";
import { Button } from "react-bootstrap";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import FormFace from "./FormFace";
import PageTitle from "../../Components/PageTitle";
import BgForm1 from "../../Components/Form/BgForm1";

const GFormBloog = () => {
  const navigate = useNavigate();

  const showModal = () => {};
  return (
    <div className="container mx-auto">
      <PageTitle
        title="Form"
        heading="Blood Group Form "
      />
      <div className="flex flex-col items-center justify-center">
        
        <div className="me-25">
          <Button
            className="mb-2"
            variant="success"
            onClick={() => navigate("/blood")}
          >
            <IoMdArrowRoundBack className="font-extrabold" />
          </Button>
        </div>
        <div className="mx-auto">
        <p className="bg-blue-400 rounded text-white p-2 capitalize">Fill the google form to add your<span className="font-semibold text-red-500 bg-yellow-300 rounded mx-2 px-2 uppercase">blood group data</span> on this website</p>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScCtiPyJAxwaWJl3xZEvLhqFq2nWhrkVLLuix6X6NdhLL8efQ/viewform?vc=0&c=0&w=1&flr=0&gxid=-8203364"
            width="360"
            height="1100"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            onSubmit={showModal}
          >
            Loading…
          </iframe>
          <p className="text-muted text-sm">
            Your data will be added on website as soon as possible...
          </p>
        </div>
      </div> */

       <FormFace />
      {/* < BgForm1/> */}
    </div>
  );
};

export default GFormBloog;
