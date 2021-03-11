import React from "react";
import { Col, Row, Button } from "react-bootstrap";

const Question = (props) => {
  const goto_prev = () => {
    const prev = props.currentQuestion - 1;
    if (prev >= 0) {
      if (props.seenStatus[prev] !== 2) {
        props.setSeenStatus(
          props.seenStatus
            .slice(0, prev)
            .concat([1])
            .concat(props.seenStatus.slice(prev + 1))
        );
      }
      props.setCurrentQuestion(prev);
    }
  };

  const goto_next = () => {
    const next = props.currentQuestion + 1;
    if (next < props.totalQuestion) {
      if (props.seenStatus[next] !== 2) {
        props.setSeenStatus(
          props.seenStatus
            .slice(0, next)
            .concat([1])
            .concat(props.seenStatus.slice(next + 1))
        );
      }
      props.setCurrentQuestion(next);
    }
  };

  const give_answer = (option_no) => {
    props.answers[props.currentQuestion] = {
      answer: option_no,
      _id: props.question_id,
    };
    props.seenStatus[props.currentQuestion] = 2;
  };

  return (
    <div>
      <h4>{props.question}</h4>
      <Row>
        <Col className="m-3" lg="5" md="5" sm="11">
          <Button
            variant={
              props.answers[props.currentQuestion].answer === "a"
                ? "primary"
                : "outline-primary"
            }
            onClick={() => give_answer("a")}
          >
            {props.option_a}
          </Button>
        </Col>
        <Col className="m-3" lg="5" md="5" sm="11">
          <Button
            variant={
              props.answers[props.currentQuestion].answer === "b"
                ? "primary"
                : "outline-primary"
            }
            onClick={() => give_answer("b")}
          >
            {props.option_b}
          </Button>
        </Col>
        <Col className="m-3" lg="5" md="5" sm="11">
          <Button
            variant={
              props.answers[props.currentQuestion].answer === "c"
                ? "primary"
                : "outline-primary"
            }
            onClick={() => give_answer("c")}
          >
            {props.option_c}
          </Button>
        </Col>
        <Col className="m-3" lg="5" md="5" sm="11">
          <Button
            variant={
              props.answers[props.currentQuestion].answer === "d"
                ? "primary"
                : "outline-primary"
            }
            onClick={() => give_answer("d")}
          >
            {props.option_d}
          </Button>
        </Col>
      </Row>
      <div className="d-flex justify-content-between mt-3">
        <Button variant="success" onClick={goto_prev}>
          Previous
        </Button>
        <Button variant="danger" onClick={props.submit_answer}>
          Submit
        </Button>
        <Button variant="success" onClick={goto_next}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Question;
