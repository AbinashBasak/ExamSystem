import React from "react";
import { Table, Container } from "react-bootstrap";
import { FaRegHandPointRight } from "react-icons/fa";
import { Link, useParams, useHistory } from "react-router-dom";

const StartExam = () => {
  const { exam_id } = useParams();
  const history = useHistory();

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  return (
    <div>
      <div
        className="bg-primary"
        style={{ height: "3rem", width: "100%" }}
      ></div>
      <div className="m-5">
        <h4 className="text-primary">Instructions : </h4>
        <ul>
          <li className="mb-3">
            <FaRegHandPointRight className="text-success mr-3" />
            This is instruction A.
          </li>
          <li className="mb-3">
            <FaRegHandPointRight className="text-success mr-3" />
            This is instruction B.
          </li>
          <li className="mb-3">
            <FaRegHandPointRight className="text-success mr-3" />
            This is instruction C.
          </li>
        </ul>
      </div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Full Marks</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exam A</td>
              <td>10</td>
              <td>15min</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <p className="mx-5 my-3 px-5 text-danger">
        <b>
          ** After clicking on the start button exam will be started and the
          timer will be started. There is no option to stop the timer.
        </b>
      </p>
      <div className="d-flex justify-content-center">
        <Link className="btn btn-success" to={"/exam/" + exam_id}>
          Start
        </Link>
      </div>
    </div>
  );
};

export default StartExam;
