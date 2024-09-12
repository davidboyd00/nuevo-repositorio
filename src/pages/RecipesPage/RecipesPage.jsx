import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";  // Asegúrate de tener este componente
import RecipeModal from "../../components/RecipeModal/RecipeModal.jsx";  // Modal para visualizar recetas
import RecipeEditModal from "../../components/RecipeEditModal/RecipeEditModal.jsx";  // Modal para editar recetas
import PageSelector from "../../components/PageSelector/PageSelector.jsx"; // Nuevo componente para la navegación entre páginas

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Añadido para manejar el total de páginas
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const API_URL = 'https://t2-24-2-backend.onrender.com';

    // Función para obtener todas las recetas
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes/?page=${page}&page_size=10`, {
                    headers: {
                        'Authorization': 'Bearer panconqueso' // Token de autorización
                    }
                });

                if (!response.ok) {
                    throw new Error("Error en la respuesta de la API");
                }

                const data = await response.json();
                console.log(data);  // Verificar el contenido de la respuesta
                setRecipes(data.recipes); // Ajustar esto según la estructura de la API
                setTotalPages(data.totalPages || 1); // Manejo de la paginación
            } catch (error) {
                console.error("Error al obtener las recetas:", error);
            }
        };

        fetchRecipes();
    }, [page]);

    // Función para mostrar el modal de visualización de receta
    const handleViewRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsViewing(true);
    };

    // Función para iniciar el modo de edición de receta
    const handleEditRecipe = () => {
        setIsEditing(true);
        setIsViewing(false); // Cierra el modal de visualización
    };

    // Función para guardar los cambios de edición de receta (Update)
    const handleSaveRecipe = async (updatedRecipe) => {
        try {
            const response = await fetch(`${API_URL}/recipes/${updatedRecipe.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer panconqueso',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRecipe)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar la receta");
            }

            const data = await response.json();
            setRecipes(prevRecipes =>
                prevRecipes.map(r => r.id === updatedRecipe.id ? data : r)
            );
            setIsEditing(false); // Cierra el modal de edición
            console.log("Receta actualizada con éxito");
        } catch (error) {
            console.error("Error al actualizar la receta:", error);
        }
    };

    // Función para eliminar la receta (DELETE)
    const handleDeleteRecipe = async () => {
        try {
            const response = await fetch(`${API_URL}/recipes/${selectedRecipe.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer panconqueso'
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la receta");
            }

            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== selectedRecipe.id));
            setIsViewing(false); // Cierra el modal después de eliminar
            console.log("Receta eliminada con éxito");
        } catch (error) {
            console.error("Error al eliminar la receta:", error);
        }
    };

    // Función para crear una nueva receta (POST)
    const handleCreateRecipe = async (newRecipe) => {
        try {
            const response = await fetch(`${API_URL}/recipes`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer panconqueso',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRecipe)
            });

            if (!response.ok) {
                throw new Error("Error al crear la receta");
            }

            const data = await response.json();
            setRecipes([...recipes, data]);  // Añadir la nueva receta a la lista
            console.log("Receta creada con éxito");
        } catch (error) {
            console.error("Error al crear la receta:", error);
        }
    };

    // Función para manejar el cambio de página
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <h1>Recipes Page</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {recipes.map(recipe => (
                    <div key={recipe.id} onClick={() => handleViewRecipe(recipe)} style={{ border: '1px solid #ddd', padding: '10px', cursor: 'pointer' }}>
                        <RecipeCard 
                            title={recipe.title} 
                            description={recipe.description} 
                            imageUrl={recipe.image} 
                            time={recipe.preparation_time_in_minutes} 
                            servings={recipe.servings} 
                        />
                    </div>
                ))}
            </div>

            {/* PageSelector para cambiar de página */}
            <PageSelector 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />

            {/* Modal para visualizar receta */}
            {isViewing && 
                <RecipeModal 
                    recipe={selectedRecipe} 
                    onClose={() => setIsViewing(false)} 
                    onEdit={handleEditRecipe} 
                    onDelete={handleDeleteRecipe} 
                />
            }

            {/* Modal para editar receta */}
            {isEditing && 
                <RecipeEditModal 
                    recipe={selectedRecipe} 
                    onClose={() => setIsEditing(false)} 
                    onSave={handleSaveRecipe} 
                />
            }
        </div>
    );
};

export default RecipesPage;
