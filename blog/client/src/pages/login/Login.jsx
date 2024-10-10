import "./login.css";
import axios from 'axios';
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext'; // AuthContext'i içe aktarın

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // AuthContext'ten login fonksiyonunu alın

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/auth/generateToken", {
                email: email,
                password: password,
            });
            console.log('Login successful', response.data);
            alert("Login Process Successfully");

            // Token'ı localStorage'da sakla
            localStorage.setItem('token', response.data); // Eğer token bir nesne ise, uygun alanı kullanın

            // AuthContext üzerinden kullanıcıyı login yap
            login(email); // Gerekirse kullanıcı adını AuthContext'e iletin

            // Kullanıcıyı UserDetails sayfasına yönlendir
            navigate('/userDetails'); // UserDetails sayfasına yönlendirin

            setEmail("");
            setPassword("");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Login not successful");
            } else {
                alert("An unexpected error occurred");
            }
        }
    }

    return (
        <div className="login">
            <div className="loginbox">
                <span className="loginTitle">Login</span>
                <form className="loginForm" onSubmit={handleLogin}>
                    <label className="label">Email</label>
                    <input className="loginInput" type="email" placeholder="Enter your email..."
                        value={email} onChange={(event) => setEmail(event.target.value)} />

                    <label className="label">Password</label>
                    <input className="loginInput" type="password" placeholder="Enter your password..."
                        value={password} onChange={(event) => setPassword(event.target.value)} />

                    <button className="loginButton" type="submit">Login</button>
                </form>
                <p>No account? <button className="loginRegisterButton"><Link className="link" to="/register">Sign Up</Link></button></p>
            </div>
        </div>
    );
}
