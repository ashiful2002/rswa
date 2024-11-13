import React from "react";
import FormfacadeEmbed from "@formfacade/embed-react";
import { Button } from "react-bootstrap";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FormFace = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="my-4 flex flex-col items-center justify-center">
        <h4 className="pageTitle ">
          {/* fill up the google form to add your blood group data on this website */}
          or This is the another smart way
        </h4>
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
          <FormfacadeEmbed
            formFacadeURL="https://formfacade.com/include/109576207896430626334/form/1FAIpQLSe_55eUyLy2Se88Z-o10x18xtgXqBu7sWn7gOcluktk8qME8Q/classic.js/?div=ff-compose"
            onSubmitForm={() => console.log("Form submitted")}
          />
          <p className="text-muted text-sm">
            Your data will be added on website as soon as possible...
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormFace;
