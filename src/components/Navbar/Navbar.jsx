import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img 
                    src="https://staticnew-prod.topdoctors.cl/article/6591/image/large/celebremos-el-18-de-septiembre-1599498597.jpg" 
                    alt="DCChef Food" 
                    className="logo" 
                    style={{ width: '150px', height: 'auto', marginRight: '15px' }} // Ajusta el tamaño del logo
                />
                <span className="navbar-title" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>DCChef</span> {/* Ajusta el tamaño y estilo del texto */}
            </div>
            <div className="navbar-links">
                <Link to="/recipes">Recipes</Link>
                <span style={{ margin: '0 10px' }}>|</span>
                <Link to="/create">Create</Link>
            </div>
        </nav>
    );
};

export default Navbar;

