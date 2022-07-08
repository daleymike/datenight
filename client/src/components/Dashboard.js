import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Dashboard = () => {
  const [allDates, setAllDates] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState([]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/api/dates", {
        name: name,
        category: category,
        location: location,
        description: description,
        rating: rating
    })
    .then((res) => {
        setAllDates([res.data, ...allDates]);
        setName("");
        setCategory("");
        setLocation("");
        setDescription("");
        setRating("");
    })
    .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errArr = [];
        for (const key of Object.keys(errorResponse)) {
            errArr.push(errorResponse[key].message);
          }
          setErrors(errArr);
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dates")
      .then((res) => {
        setAllDates(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Nav />
      <div className="container">
        <h2 style={{ textAlign: "center" }}>NAME Dashboard</h2>
        <br />
        <br />
        <div className="d-flex justify-content-around">
          <div style={{width: 400, margin: 3}}>
            <h3>Date Reviews:</h3>
            <br />
            <div className="dateList">
              {allDates.map((date, index) => {
                return <p key={index}>{date.name}</p>;
              })}
            </div>
          </div>
          <div style={{width: 400, margin: 3}}>
            <h3>Create a Date Review:</h3>
            <br />
            <form onSubmit={onSubmitHandler} className="form">
            {errors.map((err, index) => (
          <p style={{ color: "red", textAlign: "center" }} key={index}>
            {err}
          </p>
        ))}
              <div className="form-group">
                <label >Date Name </label>
                <input className="form-control" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label >Category </label>
                <select className="form-control" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Please Choose...</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="adventure">Adventure</option>
                    <option value="diy">DIY</option>
                </select>
              </div>
              <div className="form-group">
                <label >Location (Zip Code)</label>
                <input className="form-control" type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div className="form-group">
                <label >Description </label>
                <textarea className="form-control" name="location" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div className="form-group">
                <label >Rating </label>
                <select className="form-control" name="category" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="">Please Choose...</option>
                    <option value="1">&#9734;</option>
                    <option value="2">&#9734;&#9734;</option>
                    <option value="3">&#9734;&#9734;&#9734;</option>
                    <option value="4">&#9734;&#9734;&#9734;&#9734;</option>
                    <option value="5">&#9734;&#9734;&#9734;&#9734;&#9734;</option>
                </select>
              </div>
              <div className="form-group">
              <button className="btn btn-outline-dark" type="submit" >Create Review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
