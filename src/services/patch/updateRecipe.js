const updateRecipe = async (recipeId, updatedData) => {
    const API_URL = 'https://t2-24-2-backend.onrender.com';
    try {
      const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer panconqueso',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la receta');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default updateRecipe;
  