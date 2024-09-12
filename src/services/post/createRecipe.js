const createRecipe = async (newRecipe) => {
    const API_URL = 'https://t2-24-2-backend.onrender.com';
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer panconqueso',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      if (!response.ok) {
        throw new Error('Error al crear la receta');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default createRecipe;
  