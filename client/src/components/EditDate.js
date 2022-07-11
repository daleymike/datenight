import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import Nav from "./Nav";

const EditDate = () => {
  const { _id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dates/" + _id)
      .then((res) => {
        setName(res.data.name);
        setCategory(res.data.category);
        setLocation(res.data.location);
        setDescription(res.data.description);
        setRating(res.data.rating);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateDate = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8000/api/dates/" + _id, {
        name: name,
        category: category,
        location: location,
        description: description,
        rating: rating,
      })
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errArr = [];
        if (err.response.status === 401) {
          navigate("/");
        }
        for (const key of Object.keys(errorResponse)) {
          errArr.push(errorResponse[key].message);
        }
        setErrors(errArr);
      });
  };

  return (
    <div>
      <Nav />
      <h2 style={{textAlign: 'center'}}>Edit Date Review</h2>
      <br />
      <div className="detailsBox" style={{margin: 'auto'}}>
      <form onSubmit={updateDate} className="form">
        {errors.map((err, index) => (
          <p style={{ color: "red", textAlign: "center" }} key={index}>
            {err}
          </p>
        ))}
        <div className="form-group">
          <label>Date Name </label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category </label>
          <select
            className="form-control"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Please Choose...</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Adventure">Adventure</option>
            <option value="DIY">DIY</option>
          </select>
        </div>
        <div className="form-group">
          <label>Location (Zip Code)</label>
          <input
            className="form-control"
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description </label>
          <textarea
            className="form-control"
            name="location"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Rating </label>
          <select
            className="form-control"
            name="category"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Please Choose...</option>
            <option value="1">&#9734;</option>
            <option value="2">&#9734;&#9734;</option>
            <option value="3">&#9734;&#9734;&#9734;</option>
            <option value="4">&#9734;&#9734;&#9734;&#9734;</option>
            <option value="5">&#9734;&#9734;&#9734;&#9734;&#9734;</option>
          </select>
        </div>
        <div style={{textAlign:'center'}}>
          <button className="editBtn" type="submit">
            Update 
          </button>
          <Link to={"/dashboard"}><button className="homeBtn">Home</button></Link>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditDate;
