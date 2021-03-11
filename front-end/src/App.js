import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// screens
import Admin from "./screens/Admin";
import Exam from "./screens/Exam";
import Login from "./screens/Login";
import Home from "./screens/Home";
import StartExam from "./screens/StartExam";
import Register from "./screens/Register";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/exam/:exam_id" component={Exam} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/start_exam/:exam_id" component={StartExam} />
    </HashRouter>
  );
}

export default App;
