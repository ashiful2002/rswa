import React from "react";

const GForm = () => {
  const showModal = () => {};

  return (
    <>
      <iframe
        className="h-[1100px] w-[360px] sm:w-[750px] xl:w-full"
        src="https://docs.google.com/forms/d/e/1FAIpQLScCtiPyJAxwaWJl3xZEvLhqFq2nWhrkVLLuix6X6NdhLL8efQ/viewform?vc=0&c=0&w=1&flr=0&gxid=-8203364"
        
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        onSubmit={showModal}
      >
        Loading…
      </iframe>
    </>
  );
};

export default GForm;
