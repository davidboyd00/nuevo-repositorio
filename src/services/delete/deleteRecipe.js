const deleteRecipe = async (recipeId) => {
    const API_URL = 'https://t2-24-2-backend.onrender.com';
    try {
      const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer panconqueso',
        },
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la receta');
      }
      console.log('Receta eliminada con éxito');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default deleteRecipe;
  