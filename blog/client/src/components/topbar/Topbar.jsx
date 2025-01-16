// Topbar.js
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../pages/login/AuthContext';
import { AiOutlineUser } from "react-icons/ai";

export default function Topbar() {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="top">
            <div className="topLeft">
                <ul >
                    <Link className="topListItem" to="/">
                        HOME
                    </Link>
                </ul>
                <ul className="topListItem">ABOUT</ul>
                <ul className="topListItem">CONTACT</ul>
                <ul>
                    <Link className="topListItem" to="/write">
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
                    <ul >
                        <Link className="topListItem" to="/login">SIGN IN</Link>
                    </ul>
                ) : (
                    <ul onClick={logout}>
                        <Link className="topListItem" to="/">SIGN OUT</Link>
                    </ul>
                )}
                <ul >
                    <Link className="topListItem" to="/register">
                        SIGN UP
                    </Link>
                </ul>
                <AiOutlineUser />
            </div>
        </div>
    );
}
