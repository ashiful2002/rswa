import React from "react";
import BsCard from "../Components/BsCard";
import ACollapse from "../Components/ACollapse";
import PageTitle from "../Components/PageTitle";

const Blog = () => {
  return (
    <>
     < PageTitle title="RSWA | Blog"/>
   
    <div className="container mx-auto">
      <h1 className="pageTitle">Blog</h1>
      <BsCard />
    </div>
    </>
  );
};

export default Blog;
