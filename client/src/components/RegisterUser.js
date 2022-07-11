import React, { useState } from "react";
import axios from "axios";

const RegisterUser = (props) => {
  const [confirmReg, setConfirmReg] = useState("");
  const [errs, setErrs] = useState({});

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setConfirmReg("Thank you for registering, you can now log in!");
        setErrs({});
      })
      .catch((err) => {
        console.log(err);
        setErrs(err.response.data.errors);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <p className="text-success">{confirmReg}</p>
      <form className="form" onSubmit={register}>
        <div className="form-group">
          <p>{errs.username ? <span className="text-danger">{errs.username.message}</span> : null}</p>
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
        <p>{errs.email ? <span className="text-danger">{errs.email.message}</span> : null}</p>
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
        <p>{errs.password ? <span className="text-danger">{errs.password.message}</span> : null}</p>
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
        <p>{errs.confirmPassword ? <span className="text-danger">{errs.confirmPassword.message}</span> : null}</p>
          <label>Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="btn btn-outline-dark" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
