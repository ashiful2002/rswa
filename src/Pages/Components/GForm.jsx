import React from "react";

const GForm = () => {
  const showModal = () => {};

  return (
    <>
      <iframe
        className=""
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
    </>
  );
};

export default GForm;
