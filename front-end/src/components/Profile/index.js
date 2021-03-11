import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsPower } from "react-icons/bs";
import "./style.css";

const Profile = (props) => {
  const history = useHistory();

  return (
    <div className="profile bg-primary">
      <div className="d-flex justify-content-center">
        <img
          className="profile-avatar"
          src={require("../../static/images/avatar.png").default}
          alt="avatar"
        />
      </div>
      <div className="profile-data">
        <label className="form-label">Name</label>
        <input className="form-control" readOnly={true} value={props.name} />
      </div>
      <div className="profile-data">
        <label className="form-label">Roll</label>
        <input className="form-control" readOnly={true} value={props.roll} />
      </div>
      <div className="profile-data">
        <label className="form-label">Department</label>
        <input
          className="form-control"
          readOnly={true}
          value={props.department}
        />
      </div>
      <div className="profile-data">
        <label className="form-label">Email</label>
        <input className="form-control" readOnly={true} value={props.email} />
      </div>
      <Button
        id="logout"
        variant="danger"
        className="text-light"
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/login");
        }}
      >
        <BsPower className="mr-2" />
        <span>Log out</span>
      </Button>
    </div>
  );
};

export default Profile;
