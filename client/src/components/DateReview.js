import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";

const DateReview = (props) => {
  const { _id } = useParams();
  const [date, setDate] = useState({});
  const navigate = useNavigate();
  const {user} = props;
  const [recipeCreator, setRecipeCreator] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dates/" + _id)
      .then((res) => {
        setDate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
    .get("http://localhost:8000/api/user/id/" + date.user_id)
    .then((res) => {
      setRecipeCreator(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  },[date])

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:8000/api/dates/${_id}`,
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err.response.data.errors));
  };



  return (
    <div>
      <Nav />
      <div className="container">
        <h2>{date.name}</h2>
        <br />
        <div className="detailsBox">
          <p style={{fontWeight: 'bold'}}>Category</p>
          <p>{date.category}</p>
          <hr />
          <p style={{fontWeight: 'bold'}}>Location (Zip Code) </p>
          <p>{date.location}</p>
          <hr />
          <p style={{fontWeight: 'bold'}}>Description</p>
          <p>{date.description}</p>
          <hr />
          <p style={{fontWeight: 'bold'}}>Rating</p>
          <p>{date.rating} <span className="colorText">&#9733;</span></p>
          <hr />
          <p style={{fontWeight: 'bold'}}>Created By</p>
          <p>{recipeCreator.username}</p>
          <hr />
          <br />
          <div className="d-flex justify-content-around">
          <Link to={"/dashboard"}> <button className="homeBtn">Home</button></Link>
          {date.user_id == user._id ? 
          <>
            <Link to={`/dates/${date._id}/edit`}><button className="editBtn" >Edit</button></Link>
          <button onClick={handleDelete} className="deleteBtn">Delete</button></> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateReview;
