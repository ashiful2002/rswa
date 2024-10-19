import React from "react";
import logo from "../src/assets/logo.png";

const App = () => {
  return (
    <div className="container mx-auto">
      <div className="h-screen flex items-center justify-center ">
        <img src={logo} alt="rswa logo" />
      </div>
      <p className="text-slate-500 m-4">
        just started working on this... <span className="text-slate-500"></span>
      </p>
    </div>
  );
};

export default App;
