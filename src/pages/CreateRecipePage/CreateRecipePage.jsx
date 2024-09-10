import { useState } from "react";

const CreateRecipePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState("");
  const [evaluation, setEvaluation] = useState(1);
  const [preparationTime, setPreparationTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (!title || !description || !ingredients || !steps || !preparationTime || !evaluation || !categories || !imageUrl) {
      setErrorMessage("All fields are required");
      return false;
    }

    if (evaluation < 1 || evaluation > 5) {
      setErrorMessage("Evaluation must be between 1 and 5");
      return false;
    }

    if (isNaN(preparationTime) || preparationTime <= 0) {
      setErrorMessage("Preparation time must be a positive number");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newRecipe = {
      title,
      description,
      ingredients: ingredients.split(","),
      steps: steps.split("\n"),
      image: imageUrl,
      categories: categories.split(","),
      evaluation: parseInt(evaluation),
      preparation_time_in_minutes: parseInt(preparationTime)
    };

    try {
      const response = await fetch("https://api.tuendpoint.com/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer panconqueso", // Token en el encabezado
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        setSuccessMessage("Recipe created successfully!");
        resetForm();
      } else if (response.status === 422) {
        const errorData = await response.json();
        setErrorMessage(`Validation error: ${errorData.detail[0].msg}`);
      } else {
        setErrorMessage("Failed to create recipe. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIngredients("");
    setSteps("");
    setImageUrl("");
    setCategories("");
    setEvaluation(1);
    setPreparationTime("");
  };

  return (
    <div>
      <h1>Create New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Ingredients (comma separated):</label>
          <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </div>
        <div>
          <label>Steps (one per line):</label>
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div>
          <label>Categories (comma separated):</label>
          <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} required />
        </div>
        <div>
          <label>Evaluation (1-5):</label>
          <input type="number" value={evaluation} min="1" max="5" onChange={(e) => setEvaluation(e.target.value)} required />
        </div>
        <div>
          <label>Preparation Time (in minutes):</label>
          <input type="number" value={preparationTime} onChange={(e) => setPreparationTime(e.target.value)} required />
        </div>
        <button type="submit">Create Recipe</button>
      </form>

      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default CreateRecipePage;
