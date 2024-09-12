const getRecipes = async () => {
    const API_URL = 'https://t2-24-2-backend.onrender.com';
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer panconqueso',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener las recetas');
      }
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default getRecipes;
  