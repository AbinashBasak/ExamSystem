import React from "react";

const ReportCardAdmin = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.roll}</td>
      <td>{props.correct}</td>
      <td>{props.wrong}</td>
      <td>{props.obtain}</td>
      <td>{props.email}</td>
    </tr>
  );
};

export default ReportCardAdmin;
