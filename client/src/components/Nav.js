import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';


const Nav = () => {
    const navigate = useNavigate();


    return (
      <div className="nav" style={{ justifyContent: "space-between" }}>
        <div className='navTitle'>
        <h2>Date Night</h2>
        <p>Community-Reviewed Date Night Ideas</p>
        </div>
        <div>
          <button className='logout'>
            Log Out
          </button>
        </div>
      </div>
    );
  };
  
  export default Nav;