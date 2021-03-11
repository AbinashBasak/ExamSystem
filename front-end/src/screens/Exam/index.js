import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./style.css";

// components
import Question from "../../components/Question";
import QuestionNav from "../../components/QuestionNav";

const Exam = () => {
  const [loaded, setLoaded] = React.useState(true);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [seenStatus, setSeenStatus] = React.useState([1, 0, 0]);
  const [totalQuestion, setTotalQuestion] = React.useState(3);
  const [answers, setAnswer] = React.useState([-1, -1, -1]);
  const [time, setTime] = React.useState(900);

  const history = useHistory();

  // TODO, use api
  const all_question = [
    {
      question: "This is question A.",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      question: "This is question B.",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      question: "This is question C.",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
  ];

  setTimeout(() => {
    if (time === 0) {
      history.push("/");
    } else if (time > 0) {
      setTime(time - 1);
    }
  }, 999);

  const loading_screen = (
    <div className="d-flex justify-content-center align-item-center">
      <h1>Loading...</h1>
    </div>
  );

  const question_paper = (
    <Row style={{ width: "98%" }}>
      <Col className="bg-primary" lg="3" md="3" sm="12">
        <QuestionNav
          all_question={all_question}
          setCurrentQuestion={setCurrentQuestion}
          seenStatus={seenStatus}
          setSeenStatus={setSeenStatus}
          answers={answers}
          time={time}
        />
      </Col>
      <Col lg="9" md="9" sm="12">
        <Question
          question={all_question[currentQuestion].question}
          option_a={all_question[currentQuestion].options[0]}
          option_b={all_question[currentQuestion].options[1]}
          option_c={all_question[currentQuestion].options[2]}
          option_d={all_question[currentQuestion].options[3]}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          seenStatus={seenStatus}
          setSeenStatus={setSeenStatus}
          totalQuestion={totalQuestion}
          answers={answers}
          setAnswer={setAnswer}
        />
      </Col>
    </Row>
  );

  return <div>{loaded ? question_paper : loading_screen}</div>;
};

export default Exam;
