import React, { useState } from 'react';
import './RecipeModal.css'; // Usa el mismo archivo CSS o crea otro específico

const RecipeEditModal = ({ recipe, onClose, onSave }) => {
    const [image, setImage] = useState(recipe.image);
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [ingredients, setIngredients] = useState(recipe.ingredients.join(', '));
    const [steps, setSteps] = useState(recipe.steps.join('\n'));
    const [preparationTime, setPreparationTime] = useState(recipe.preparation_time_in_minutes);
    const [evaluation, setEvaluation] = useState(recipe.evaluation);
    const [categories, setCategories] = useState(recipe.categories.join(', '));

    const handleSave = () => {
        const updatedRecipe = {
            ...recipe,
            image,
            title,
            description,
            ingredients: ingredients.split(',').map(ing => ing.trim()),
            steps: steps.split('\n').map(step => step.trim()),
            preparation_time_in_minutes: preparationTime,
            evaluation,
            categories: categories.split(',').map(cat => cat.trim())
        };
        onSave(updatedRecipe);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Edit {title}</h2>
                <input 
                    type="text" 
                    value={image} 
                    onChange={(e) => setImage(e.target.value)} 
                    placeholder="Image URL" 
                />
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title" 
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Description" 
                />
                <textarea 
                    value={ingredients} 
                    onChange={(e) => setIngredients(e.target.value)} 
                    placeholder="Ingredients (comma separated)" 
                />
                <textarea 
                    value={steps} 
                    onChange={(e) => setSteps(e.target.value)} 
                    placeholder="Steps (one per line)" 
                />
                <input 
                    type="number" 
                    value={preparationTime} 
                    onChange={(e) => setPreparationTime(e.target.value)} 
                    placeholder="Preparation Time (minutes)" 
                />
                <input 
                    type="number" 
                    value={evaluation} 
                    onChange={(e) => setEvaluation(e.target.value)} 
                    placeholder="Evaluation (1-5)" 
                    min="1" 
                    max="5" 
                />
                <input 
                    type="text" 
                    value={categories} 
                    onChange={(e) => setCategories(e.target.value)} 
                    placeholder="Categories (comma separated)" 
                />
                
                <div className="modal-actions">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeEditModal;
