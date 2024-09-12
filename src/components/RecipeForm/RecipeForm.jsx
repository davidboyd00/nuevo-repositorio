import React, { useState } from "react";

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
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>Create a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}

                <label>Ingredients (comma separated)</label>
                <input
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                />
                {errors.ingredients && <p style={{ color: "red" }}>{errors.ingredients}</p>}

                <label>Tags (comma separated)</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                />
                {errors.tags && <p style={{ color: "red" }}>{errors.tags}</p>}

                <label>Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
                {errors.imageUrl && <p style={{ color: "red" }}>{errors.imageUrl}</p>}

                <label>Preparation Time (in minutes)</label>
                <input
                    type="text"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleChange}
                />
                {errors.preparationTime && <p style={{ color: "red" }}>{errors.preparationTime}</p>}

                <label>Steps (one per line)</label>
                <textarea
                    name="steps"
                    value={formData.steps}
                    onChange={handleChange}
                />
                {errors.steps && <p style={{ color: "red" }}>{errors.steps}</p>}

                <label>Evaluation (1-5)</label>
                <input
                    type="number"
                    name="evaluation"
                    min="1"
                    max="5"
                    value={formData.evaluation}
                    onChange={handleChange}
                />
                {errors.evaluation && <p style={{ color: "red" }}>{errors.evaluation}</p>}

                <label>Categories (comma separated)</label>
                <input
                    type="text"
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                />
                {errors.categories && <p style={{ color: "red" }}>{errors.categories}</p>}

                <button type="submit">Cook</button>
            </form>
        </div>
    );
};

export default RecipeForm;
