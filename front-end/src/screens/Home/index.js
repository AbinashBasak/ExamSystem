import React from "react";
import { Col, Row } from "react-bootstrap";
import { base_url } from "../../API";
import { useHistory } from "react-router-dom";
import "./style.css";

// components
import Profile from "../../components/Profile";
import Container from "../../components/Container";
import ExamCard from "../../components/ExamCard";
import ReportCard from "../../components/ReportCard";

const Home = () => {
  const [load, setLoad] = React.useState(false);
  const [profile, setProfile] = React.useState({});

  const history = useHistory();

  React.useEffect(() => {
    if (!load) {
      fetch(base_url + "/profile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((data) => data.json())
        .then((json) => {
          console.log(json);
          setProfile(json);
        });
      setLoad(true);
    }
  }, []);

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  return (
    <div style={{ width: "98%" }}>
      <Row>
        <Col lg="3" md="4" sm="12">
          <Profile
            name={load ? profile.name : ""}
            roll={load ? profile.rollNo : ""}
            email={load ? profile.email : ""}
            department={load ? profile.dept : ""}
          />
        </Col>
        <Col className="dashboard" lg="9" md="8" sm="12">
          <Container key="cnt-0" header="Available Exams">
            {profile.incompleteExam &&
              profile.incompleteExam.map((data, index) => (
                <ExamCard
                  key={"aval_exam_" + index}
                  exam_name={data.title}
                  exam_id={data.exam}
                  full_marks="10"
                  time="15 Min"
                />
              ))}
            {console.log(profile)}
          </Container>
          <Container key="cnt-1" header="Results">
            <Row>
              <Col lg="3" md="3" sm="0"></Col>
              <Col lg="3" md="3" sm="0">
                Correct
              </Col>
              <Col lg="3" md="3" sm="0">
                Wrong
              </Col>
              <Col lg="3" md="3" sm="0">
                Full Marks
              </Col>
            </Row>

            {profile.scores &&
              profile.scores.map((data, index) => (
                <ReportCard
                  key={"report_card_" + index}
                  exam_name={data.title}
                  exam_id={data.exam}
                  correct={data.score}
                  wrong={data.fullMask - data.score}
                  obtain={data.fullMask}
                />
              ))}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
