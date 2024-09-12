import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="https://staticnew-prod.topdoctors.cl/article/6591/image/large/celebremos-el-18-de-septiembre-1599498597.jpg" alt="DCChef Food" className="logo" /> {/* Usa el URL de la imagen */}
                <span className="navbar-title">DCChef</span>
            </div>
            <div className="navbar-links">
                <Link to="/recipes">Recipes</Link>
                <span>|</span>
                <Link to="/create">Create</Link>
            </div>
        </nav>
    );
};

export default Navbar;
