import React from "react";
import Login from "../components/Login";
import RegisterUser from "../components/RegisterUser";

const LogReg = (props) => {
  const {setUserEmail} = props
  const {setIsLoggedIn} = props
  const {protectedError} = props
  const {setProtectedError} = props
  
  return (
    <div>
      <div className="nav" style={{ justifyContent: "space-between" }}>
        <div className="navTitle">
          <h2>Date Night</h2>
          <p>Community-Reviewed Date Night Ideas</p>
        </div>
      </div>
      <h2 style={{textAlign: 'center', color: 'red'}}>{protectedError}</h2>
      <br />
      <div className="d-flex justify-content-around">
        
        <div className="loginBox">
          <Login setUserEmail={setUserEmail} setProtectedError={setProtectedError} setIsLoggedIn={setIsLoggedIn}/>
        </div>
        <div className="loginBox">
          <RegisterUser />
        </div>
      </div>
    </div>
  );
};

export default LogReg;
