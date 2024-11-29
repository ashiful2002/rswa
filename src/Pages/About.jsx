import React from "react";
import { aboutBangla, aboutEnglish } from "../constants";
import PageTitle from "../Components/PageTitle";

const About = () => {
  return (
    <>
      <div className="container mx-auto">
        <PageTitle title="About" heading="about" />

        {aboutEnglish &&
          aboutEnglish.map((item, index) => <p key={index}>{item.para}</p>)}

        <PageTitle heading=" বাংলায়ঃ " className="inline px-10 mb-4 shadow drop-shadow-sm"/>
        {aboutBangla &&
          aboutBangla.map((item, index) => <p  key={index}>{item.para}</p>)}
      </div>
    </>
  );
};

export default About;
