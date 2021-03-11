import React from "react";
import { Col, Row } from "react-bootstrap";

const ReportCard = (props) => {
  return (
    <Row className="my-3 border-bottom">
      <Col lg="3" md="3" sm="12">
        <h4>{props.exam_name}</h4>
      </Col>
      <Col lg="3" md="3" sm="12">
        <h4 className="text-success">{props.correct}</h4>
      </Col>
      <Col lg="3" md="3" sm="12">
        <h4 className="text-danger">{props.wrong}</h4>
      </Col>
      <Col lg="3" md="3" sm="12">
        <h4 className="text-primary">{props.obtain}</h4>
      </Col>
    </Row>
  );
};

export default ReportCard;
