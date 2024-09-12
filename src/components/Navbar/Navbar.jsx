import React from "react";
import { Link } from "react-router-dom"; // Utiliza Link de react-router-dom para la navegación
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="https://staticnew-prod.topdoctors.cl/article/6591/image/large/celebremos-el-18-de-septiembre-1599498597.jpg" 
                     alt="DCChef Food" 
                     className="logo" /> 
                <span className="navbar-title">DCChef</span>
            </div>
            <div className="navbar-links">
                <Link to="/">Recipes</Link>  {/* Enlace a la página de recetas */}
                <span>|</span>
                <Link to="/create-recipe">Create</Link>  {/* Enlace a la página de creación */}
            </div>
        </nav>
    );
};

export default Navbar;

