import React from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { base_url } from "../../API";
import "./style.css";

// components
import Password from "../../components/Password";

const Login = () => {
  const [email_value, setEmail] = React.useState("");
  const [password_value, setPassword] = React.useState("");

  const history = useHistory();

  const login_now = () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `${base_url}/login?email=${email_value}&password=${password_value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          history.push("/");
        }
      })
      .catch((error) => console.log("error", error));
  };

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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <Password setPassword={setPassword} />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={login_now}>
            Login
          </Button>
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
