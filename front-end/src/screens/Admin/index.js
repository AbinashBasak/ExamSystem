import React from "react";
import { Container, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// components
import ReportCardAdmin from "../../components/ReportCardAdmin";

const Admin = () => {
  const history = useHistory();

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  // TODO, use api
  var all_result = [
    <ReportCardAdmin
      name="Student Name A"
      roll="ROLL0001"
      wrong="3"
      correct="7"
      obtain="7"
    />,
    <ReportCardAdmin
      name="Student Name B"
      roll="ROLL0002"
      wrong="3"
      correct="7"
      obtain="7"
    />,
    <ReportCardAdmin
      name="Student Name C"
      roll="ROLL0003"
      wrong="3"
      correct="7"
      obtain="7"
    />,
  ];

  return (
    <div>
      <h2 className="w-100 text-center text-primary">Exam Result</h2>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Obtain</th>
            </tr>
          </thead>
          <tbody>{all_result}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Admin;
