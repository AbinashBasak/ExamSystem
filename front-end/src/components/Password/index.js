import React from "react";
import { Button } from "react-bootstrap";

// icons
import { BsLock, BsUnlock } from "react-icons/bs";

const Password = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="d-flex">
      <input
        className="form-control"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        required
      />
      <Button
        variant="light"
        onClick={() =>
          showPassword ? setShowPassword(false) : setShowPassword(true)
        }
      >
        {showPassword ? <BsLock /> : <BsUnlock />}
      </Button>
    </div>
  );
};

export default Password;
