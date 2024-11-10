import React from "react";
import { Button } from "react-bootstrap";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const GFormBloog = () => {
    const navigate = useNavigate();

  const showModal = () => {};
  return (
    <div className="container mx-auto">
      <div className="my-4 flex flex-col items-center justify-center">
        <h4 className="pageTitle">
          fill up the google form to add your blood group data on this website
        </h4>
        <div className="-ml-[26rem]">
          <Button
            className="mb-2"
            variant="success" 
            onClick={() => navigate("/blood")}
          >
             
            <IoMdArrowRoundBack className="font-extrabold" />
          </Button>
          
        </div>
        <div className="">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScCtiPyJAxwaWJl3xZEvLhqFq2nWhrkVLLuix6X6NdhLL8efQ/viewform?vc=0&c=0&w=1&flr=0&gxid=-8203364"
            width="450"
            height="1100"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            onSubmit={showModal}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default GFormBloog;
