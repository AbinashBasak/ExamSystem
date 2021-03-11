import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { base_url } from "../../API";
import "./style.css";

// components
import Password from "../../components/Password";

const Register = () => {
  const [name_value, setName] = React.useState("");
  const [email_value, setEmail] = React.useState("");
  const [roll_value, setRoll] = React.useState("");
  const [dep_value, setDep] = React.useState("");
  const [pswd, setPswd] = React.useState("");
  const [re_pswd, setRepswd] = React.useState("");

  const history = useHistory();

  const register_now = () => {
    if (pswd === re_pswd) {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        `${base_url}/sign-up?email=${email_value}&password=${pswd}&name=${name_value}&rollNo=${roll_value}&dept=${dep_value}`,
        requestOptions
      )
        .then((response) => {
          if (response.status === 200) {
            history.push("/login");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

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
            onChange={(e) => setName(e.target.value)}
            required
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
          <input
            className="form-control"
            type="text"
            placeholder="Roll"
            onChange={(e) => setRoll(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Department"
            onChange={(e) => setDep(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <Password setPassword={setPswd} />
        </div>
        <div className="mb-3">
          <Password setPassword={setRepswd} />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={register_now}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
