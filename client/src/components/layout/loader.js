import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
          marginTop: "100px",
        }}
      ></Spinner>
      <h3 className="my-3">Loading</h3>
    </div>
  );
};

export default Loader;
