import React, { useState } from "react";
import './RecipeForm.css';  // Asegúrate de importar el archivo CSS para los estilos

const RecipeForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: "",
        tags: "",
        imageUrl: "",
        preparationTime: "",
        steps: "",
        evaluation: "",
        categories: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.title) newErrors.title = "Title is required.";
        if (!formData.description) newErrors.description = "Description is required.";
        if (!formData.ingredients) newErrors.ingredients = "Ingredients are required.";
        if (!formData.tags) newErrors.tags = "Tags are required.";
        if (!formData.imageUrl || !formData.imageUrl.startsWith("http")) {
            newErrors.imageUrl = "Valid image URL is required.";
        }
        if (!formData.preparationTime || isNaN(formData.preparationTime)) {
            newErrors.preparationTime = "Preparation time must be a number.";
        }
        if (!formData.steps) newErrors.steps = "Steps are required.";
        if (!formData.evaluation || formData.evaluation < 1 || formData.evaluation > 5) {
            newErrors.evaluation = "Evaluation must be between 1 and 5.";
        }
        if (!formData.categories) newErrors.categories = "Categories are required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const isSuccessful = await onSubmit(formData);
        if (isSuccessful) resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            ingredients: "",
            tags: "",
            imageUrl: "",
            preparationTime: "",
            steps: "",
            evaluation: "",
            categories: ""
        });
    };

    return (
        <div className="recipe-form-container">
            <h2>Create a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                {errors.title && <p className="error-text">{errors.title}</p>}

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {errors.description && <p className="error-text">{errors.description}</p>}

                <label htmlFor="ingredients">Ingredients (comma separated)</label>
                <input
                    id="ingredients"
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                />
                {errors.ingredients && <p className="error-text">{errors.ingredients}</p>}

                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                    id="tags"
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                />
                {errors.tags && <p className="error-text">{errors.tags}</p>}

                <label htmlFor="imageUrl">Image URL</label>
                <input
                    id="imageUrl"
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
                {errors.imageUrl && <p className="error-text">{errors.imageUrl}</p>}

                <label htmlFor="preparationTime">Preparation Time (in minutes)</label>
                <input
                    id="preparationTime"
                    type="text"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleChange}
                />
                {errors.preparationTime && <p className="error-text">{errors.preparationTime}</p>}

                <label htmlFor="steps">Steps (one per line)</label>
                <textarea
                    id="steps"
                    name="steps"
                    value={formData.steps}
                    onChange={handleChange}
                />
                {errors.steps && <p className="error-text">{errors.steps}</p>}

                <label htmlFor="evaluation">Evaluation (1-5)</label>
                <input
                    id="evaluation"
                    type="number"
                    name="evaluation"
                    min="1"
                    max="5"
                    value={formData.evaluation}
                    onChange={handleChange}
                />
                {errors.evaluation && <p className="error-text">{errors.evaluation}</p>}

                <label htmlFor="categories">Categories (comma separated)</label>
                <input
                    id="categories"
                    type="text"
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                />
                {errors.categories && <p className="error-text">{errors.categories}</p>}

                <button type="submit">Cook</button>
            </form>
        </div>
    );
};

export default RecipeForm;
