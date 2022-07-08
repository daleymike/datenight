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
        setConfirmReg("Thank you for Registering, you can now log in!");
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
      {confirmReg ? <h4>{confirmReg}</h4> : null}
      <form onSubmit={register}>
        <div>
          <label>Username</label>
          {errs.username ? <span>{errs.username.message}</span> : null}
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Email</label>
          {errs.email ? <span>{errs.email.message}</span> : null}
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Password</label>
          {errs.password ? <span>{errs.username.password}</span> : null}
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          {errs.confirmPassword ? <span>{errs.username.password}</span> : null}
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
};

export default RegisterUser;
