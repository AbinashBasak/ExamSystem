import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { base_url } from "../../API";
import "./style.css";

// components
import Question from "../../components/Question";
import QuestionNav from "../../components/QuestionNav";

const Exam = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [all_question, setAllQuestion] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [seenStatus, setSeenStatus] = React.useState([1, 0, 0, 0, 0, 0]);
  const totalQuestion = 6;
  const [answers, setAnswer] = React.useState([-1, -1, -1, -1, -1, -1]);
  const [time, setTime] = React.useState(900);

  const history = useHistory();
  const { exam_id } = useParams();

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  React.useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
      redirect: "follow",
    };

    fetch(`${base_url}/incomplete/exam?examId=${exam_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAllQuestion(result);
        setLoaded(true);
      })
      .catch((error) => console.log("error", error));
  }, []);

  setTimeout(() => {
    if (time === 0) {
      history.push("/");
    } else if (time > 0) {
      setTime(time - 1);
    }
  }, 999);

  const submit_answer = () => {
    const given_answers = [];
    for (var i = 0; i < 6; i++) {
      if (answers[i] !== -1) {
        given_answers.push(answers[i]);
      }
    }

    fetch(
      `${base_url}/checkAnswer?answerSheet=${JSON.stringify(
        given_answers
      )}&examId=${exam_id}`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((data) => {
        if (data.status === 200) {
          history.push("/");
        }
      })
      .catch((error) => console.log(error));
  };

  const loading_screen = (
    <div
      className="d-flex justify-content-center align-item-center"
      style={{ height: "100vh" }}
    >
      <h1>Loading...</h1>
    </div>
  );

  const question_paper = () => {
    return (
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
            question_id={all_question.quizs[currentQuestion]._id}
            question={all_question.quizs[currentQuestion].question}
            option_a={all_question.quizs[currentQuestion].options[0].a}
            option_b={all_question.quizs[currentQuestion].options[0].b}
            option_c={all_question.quizs[currentQuestion].options[0].c}
            option_d={all_question.quizs[currentQuestion].options[0].d}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            seenStatus={seenStatus}
            setSeenStatus={setSeenStatus}
            totalQuestion={totalQuestion}
            answers={answers}
            setAnswer={setAnswer}
            submit_answer={submit_answer}
          />
        </Col>
      </Row>
    );
  };

  return <div>{loaded ? question_paper() : loading_screen}</div>;
};

export default Exam;
