import React from "react";
import "./style.css";

const Container = (props) => {
  return (
    <div className="container">
      <div className="container-header">
        <h3>{props.header}</h3>
      </div>
      <div className="container-body">{props.body}</div>
    </div>
  );
};

export default Container;
