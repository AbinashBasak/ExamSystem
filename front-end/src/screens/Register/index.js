import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";

// components
import Password from "../../components/Password";

const Register = () => {
  return (
    <div className="register-canvas">
      <div className="register-form">
        <div className="d-flex justify-content-center mb-3">
          <img
            src={require("../../static/images/avatar.png").default}
            alt="avatar"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            required
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
          <input
            className="form-control"
            type="text"
            placeholder="Roll"
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Department"
            required
          />
        </div>
        <div class="mb-3">
          <Password />
        </div>
        <div class="mb-3">
          <Password />
        </div>
        <div class="d-flex justify-content-center">
          <Button variant="success">Register</Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
