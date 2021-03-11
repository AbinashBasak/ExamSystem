import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

// components
import Password from "../../components/Password";

const Login = () => {
  return (
    <div className="login-canvas">
      <div className="login-form">
        <div className="d-flex justify-content-center mb-3">
          <img
            src={require("../../static/images/avatar.png").default}
            alt="avatar"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <Password />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="success">Login</Button>
        </div>
        <hr />
        <div className="d-flex justify-content-center mt-3">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
