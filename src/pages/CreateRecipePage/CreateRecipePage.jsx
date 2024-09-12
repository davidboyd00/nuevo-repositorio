import { useState } from "react";
import RecipeForm from "../../components/RecipeForm/RecipeForm.jsx";

const CreateRecipePage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData) => {
    const newRecipe = {
      title: formData.title,
      description: formData.description,
      ingredients: formData.ingredients.split(","),
      steps: formData.steps.split("\n"),
      image: formData.imageUrl,
      categories: formData.categories.split(","),
      evaluation: parseInt(formData.evaluation),
      preparation_time_in_minutes: parseInt(formData.preparationTime),
    };

    try {
      // Llamada a la API usando fetch
      const response = await fetch("https://t2-24-2-backend.onrender.com/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer panconqueso", // Token en el encabezado
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        setSuccessMessage("Recipe created successfully!");
        return true; // Indica éxito al RecipeForm
      } else if (response.status === 422) {
        const errorData = await response.json();
        setErrorMessage(`Validation error: ${errorData.detail[0].msg}`);
      } else {
        setErrorMessage("Failed to create recipe. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }

    return false; // Indica error al RecipeForm
  };

  return (
    <div>
      <h1>Create New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} />
      
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default CreateRecipePage;

