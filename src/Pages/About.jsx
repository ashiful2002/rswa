import React from "react";
import { aboutBangla, aboutEnglish } from "../constants";

const About = () => {
  return (
    <div className="container mx-auto">
      <h1 className="pageTitle">About</h1>
      <p>{aboutEnglish}</p>
      <p>{aboutBangla}</p>
    </div>
  );
};

export default About;
