const getRecipes = async (page = 1) => {
    const API_URL = 'https://t2-24-2-backend.onrender.com';
    try {
      const response = await fetch(`${API_URL}/recipes?page=${page}&page_size=10`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer panconqueso',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener las recetas');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
      throw error;
    }
  };
  
  export default getRecipes;
  