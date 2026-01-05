import React from "react";
import { aboutBangla, aboutEnglish } from "../constants";
import PageTitle from "../Components/PageTitle";

const About = () => {
  return (
    <>
      <div className="container mx-auto">
        <PageTitle title="About" heading="about" />
        {/* <PageTitle title="About" heading="about" />

        {aboutEnglish &&
          aboutEnglish.map((item, index) => <p key={index}>{item.para}</p>)} */}
        <PageTitle className="mb-4 inline px-10 shadow drop-shadow-sm" />
        {aboutBangla &&
          aboutBangla.map((item, index) => <p key={index}>{item.para}</p>)}
        <a
          href="https://drive.google.com/uc?export=download&id=17P1-xbsbqbmf76sP-aPllIpvpHHqw9QN"
          target="_blank"
          rel="noopener noreferrer"
        >
          গঠনতন্ত্র ডাউনলোড করুন
        </a>
      </div>
    </>
  );
};

export default About;
