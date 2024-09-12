import { useState } from "react";
import axios from "axios";
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
      // Llamada a la API usando Axios
      const response = await axios.post("https://t2-24-2-backend.onrender.com/recipes", newRecipe, {
        headers: {
          Authorization: "Bearer panconqueso",  // Token en el encabezado
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Recipe created successfully!");
        return true; // Indica éxito al RecipeForm
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage(`Validation error: ${error.response.data.detail[0].msg}`);
      } else {
        setErrorMessage("Failed to create recipe. Please try again.");
      }
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
