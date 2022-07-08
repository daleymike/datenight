import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
            email: email,
            password: password,
        },{
            withCredentials: true
        })
        .then((res) => {
            console.log(res.cookie);
            console.log(res);
            console.log(res.data, 'is res data!');
            navigate("/dashboard")
        })
        .catch(err => {
            console.log(err.response);
            setErrorMessage(err.response.data.message);
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <p>{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
                <div>
                    <label>Email</label>
                    <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type='submit'>Sign In</button>
                </div>


            </form>
        </div>
    )
}

export default Login;
