import React from 'react';
import './RecipeModal.css'; // Archivo CSS para estilizar el modal

const RecipeModal = ({ recipe, onClose, onEdit, onDelete }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>

                <h4>Ingredients:</h4>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

                <h4>Steps:</h4>
                <ol>
                    {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>

                <p><strong>Preparation Time:</strong> {recipe.preparation_time_in_minutes} minutes</p>
                <p><strong>Evaluation:</strong> {recipe.evaluation} / 5</p>
                <p><strong>Categories:</strong> {recipe.categories.join(", ")}</p>

                <div className="modal-actions">
                    <button className="edit-btn" onClick={onEdit}>Edit Recipe</button>
                    <button className="delete-btn" onClick={onDelete}>Delete Recipe</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
