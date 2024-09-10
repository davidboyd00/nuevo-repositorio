import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import foodImage from "../assets/images/DCC.png";  // Importa la imagen

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={foodImage} alt="DCChef Food" className="logo" /> {/* Usa la imagen importada */}
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
