import React from "react";
import Login from "../components/Login";
import RegisterUser from "../components/RegisterUser";

const LogReg = (props) => {
  return (
    <div>
      <div className="nav" style={{ justifyContent: "space-between" }}>
        <div className="navTitle">
          <h2>Date Night</h2>
          <p>Community-Reviewed Date Night Ideas</p>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div className="loginBox">
          <Login />
        </div>
        <div className="loginBox">
          <RegisterUser />
        </div>
      </div>
    </div>
  );
};

export default LogReg;
