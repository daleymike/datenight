import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {setUserEmail} = props;
  const {setIsLoggedIn} = props;
  const {setProtectedError} = props;

  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.cookie);
        console.log(res);
        console.log(res.data, "is res data!");
        setUserEmail(email);
        setIsLoggedIn(true);
        setProtectedError("");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <p className="text-danger">{errorMessage ? errorMessage : ""}</p>
      <form className="form" onSubmit={login}>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <button className="btn btn-outline-dark" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
