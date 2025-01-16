import "./register.css"
import axios from 'axios';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {

    const [_id, setId] = useState('');
    const [username, setName] = useState("");
    const [email, seteMail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);



    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/auth/addNewUser",
                {
                    username: username,
                    email: email,
                    password: password
                });
            alert("Student Registation Successfully");
            setId("");
            setName("");
            seteMail("");
            setPassword("");
        }
        catch (err) {
            alert(err);
            console.log(err);
        }
    }

    return (
        <div className="register">
            <div className="registerbox">
                <span className="registerTitle">Register</span>
                <form className="registerForm">
                    <label className="label">Username</label>
                    <input className="registerInput" type="text" id="username" placeholder="Enter your username..." value={username} onChange={(event) => {
                        setName(event.target.value);
                    }} />
                    <label className="label">Email</label>
                    <input className="registerInput" type="text" id="email" placeholder="Enter your email..." value={email} onChange={(event) => {
                        seteMail(event.target.value);
                    }}
                    />
                    <label className="label">Password</label>
                    <input className="registerInput" type="password" id="password" placeholder="Enter your password..." value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                    <button className="registerButton" onClick={save}>Register</button>
                </form>
                <p> Already have an account? <button className="registerLoginButton"><Link className="link" to="/login">Sign in</Link></button> </p>
            </div>
        </div>



    )
}