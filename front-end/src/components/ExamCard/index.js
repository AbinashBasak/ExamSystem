import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExamCard = (props) => {
  return (
    <Row className="my-3 border-bottom">
      <Col lg="3" md="3" sm="12">
        <h4>{props.exam_name}</h4>
      </Col>
      <Col lg="3" md="3" sm="12">
        <h4>
          <span className="text-primary">Full Marks : </span>
          {props.full_marks}
        </h4>
      </Col>
      <Col lg="3" md="3" sm="12">
        <h4>
          <span className="text-primary">Time : </span>
          {props.time}
        </h4>
      </Col>
      <Col lg="3" md="3" sm="12">
        <div className="d-flex justify-content-center">
          <Link class="btn btn-success" to={"/start_exam/" + props.exam_id}>
            Attend Exam
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default ExamCard;
