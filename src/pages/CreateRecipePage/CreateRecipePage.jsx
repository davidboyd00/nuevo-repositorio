import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar después de crear la receta
import createRecipe from "../../services/post/createRecipe"; // Importa la función de crear receta

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
  const [isSubmitting, setIsSubmitting] = useState(false); // Controla el estado del botón

  const navigate = useNavigate(); // Para redirigir a otra página

  const validateForm = () => {
    if (!imageUrl.startsWith("https://")) {
      setErrorMessage("La URL de la imagen debe comenzar con 'https://'.");
      return false;
    }

    if (evaluation < 1 || evaluation > 5) {
      setErrorMessage("La evaluación debe ser un número entre 1 y 5.");
      return false;
    }

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
      preparation_time_in_minutes: parseInt(preparationTime),
    };

    setIsSubmitting(true); // Desactiva el botón mientras se envía

    try {
      await createRecipe(newRecipe); // Llama a la función para crear la receta
      setSuccessMessage("Receta creada con éxito!");
      resetForm();
      setTimeout(() => {
        navigate("/recipes"); // Redirige a la página de recetas después de 2 segundos
      }, 2000);
    } catch (error) {
      setErrorMessage("Error al crear la receta.");
    } finally {
      setIsSubmitting(false); // Reactiva el botón al finalizar
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

  // Borra los mensajes después de 5 segundos
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      <h1>Crear Nueva Receta</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Ingredientes (separados por comas):</label>
          <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </div>
        <div>
          <label>Pasos (uno por línea):</label>
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
        </div>
        <div>
          <label>URL de la imagen:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div>
          <label>Categorías (separadas por comas):</label>
          <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} required />
        </div>
        <div>
          <label>Evaluación (1-5):</label>
          <input type="number" value={evaluation} min="1" max="5" onChange={(e) => setEvaluation(e.target.value)} required />
        </div>
        <div>
          <label>Tiempo de preparación (en minutos):</label>
          <input type="number" value={preparationTime} onChange={(e) => setPreparationTime(e.target.value)} required />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Receta"}
        </button>
      </form>

      {/* Mensajes de éxito o error */}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default CreateRecipePage;
