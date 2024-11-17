import React from "react";
import { aboutBangla, aboutEnglish } from "../constants";
import PageTitle from "../Components/PageTitle";

const About = () => {
  return (
    <>
      <div className="container mx-auto">
        <PageTitle title="About" heading="about" />
        <p>{aboutEnglish}</p>
        <p>{aboutBangla}</p>
      </div>
    </>
  );
};

export default About;
