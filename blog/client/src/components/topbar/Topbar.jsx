// Topbar.js
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../pages/login/AuthContext';
import { AiOutlineUser } from "react-icons/ai";

export default function Topbar() {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Çıkış yapma fonksiyonu
    function handleLogout() {
        logout(); // AuthContext'teki logout fonksiyonunu çağır
        localStorage.removeItem("token"); // Token'ı temizle
        alert("Başarıyla çıkış yapıldı.");
        navigate("/login"); // Login sayfasına yönlendir
    }

    return (
        <div className="top">
            <div className="topLeft">
                <ul className="topListItem">
                    <Link className="link" to="/">
                        HOME
                    </Link>
                </ul>
                <ul className="topListItem">ABOUT</ul>
                <ul className="topListItem">CONTACT</ul>
                <ul className="topListItem">
                    <Link className="link" to="/write">
                        WRITE
                    </Link>
                </ul>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    {/* Diğer öğeler */}
                </ul>
            </div>
            <div className="topRight">
                <i className="topSearchIcon fas fa-search"></i>
                {!currentUser ? (
                    <ul className="topListItem">
                        <Link className="link" to="/login">SIGN IN</Link>
                    </ul>
                ) : (
                    <ul className="topListItem" onClick={handleLogout}>
                        SIGN OUT
                    </ul>
                )}
                <ul className="topListItem">
                    <Link className="link" to="/register">
                        SIGN UP
                    </Link>
                </ul>
                <AiOutlineUser />
            </div>
        </div>
    );
}
