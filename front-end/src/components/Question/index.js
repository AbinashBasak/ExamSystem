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
    console.log(props.currentQuestion);
    console.log("Seen : " + props.seenStatus);
    console.log("Answers : " + props.answers);
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
    console.log(props.currentQuestion);
    console.log("Seen : " + props.seenStatus);
    console.log("Answers : " + props.answers);
  };

  const give_answer = (option) => {
    props.answers[props.currentQuestion] = option;
    props.seenStatus[props.currentQuestion] = 2;
    console.log(props.currentQuestion);
    console.log("Seen : " + props.seenStatus);
    console.log("Answers : " + props.answers);
  };

  return (
    <div>
      <h4>{props.question}</h4>
      <Row>
        <Col className="m-3" lg="5" md="5" sm="11">
          <Button
            variant={
              props.answers[props.currentQuestion] === 0
                ? "primary"
                : "outline-primary"
            }
            onClick={() => give_answer(0)}
          >
            {props.option_a}
          </Button>
        </Col>
        <Col className="m-3" lg="5" md="5" sm="11">
          <Button
            variant={
              props.answers[props.currentQuestion] === 1
                ? "primary"
                : "outline-primary"
            }
            onClick={() => give_answer(1)}
          >
            {props.option_b}
          </Button>
        </Col>
        <Col className="m-3" lg="5" md="5" sm="11">
          <Button
            variant={
              props.answers[props.currentQuestion] === 2
                ? "primary"
                : "outline-primary"
            }
            onClick={() => give_answer(2)}
          >
            {props.option_c}
          </Button>
        </Col>
        <Col className="m-3" lg="5" md="5" sm="11">
          <Button
            variant={
              props.answers[props.currentQuestion] === 3
                ? "primary"
                : "outline-primary"
            }
            onClick={() => give_answer(3)}
          >
            {props.option_d}
          </Button>
        </Col>
      </Row>
      <div className="d-flex justify-content-between mt-3">
        <Button variant="success" onClick={goto_prev}>
          Previous
        </Button>
        <Button variant="success" onClick={goto_next}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Question;
