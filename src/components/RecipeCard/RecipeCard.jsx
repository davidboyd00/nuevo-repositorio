import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ title, description, imageUrl, time, servings }) => {
    return (
        <div className="recipe-card">
            <img src={imageUrl} alt={title} className="recipe-image" />
            <div className="recipe-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="recipe-info">
                    <span>{time} min</span>
                    <span>{servings} personas</span>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
