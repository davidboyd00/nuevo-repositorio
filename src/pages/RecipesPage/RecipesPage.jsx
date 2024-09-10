import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";  // Asegúrate de tener este componente
import RecipeModal from "./RecipeModal"; // Modal para visualizar recetas
import RecipeEditModal from "./RecipeEditModal"; // Modal para editar recetas

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Hacer la solicitud a la API
        const fetchRecipes = async () => {
            const response = await fetch(`https://api.tuendpoint.com/recipes?page=${page}`, {
                headers: {
                    'Authorization': 'Bearer panconqueso' // Token de autorización
                }
            });
            const data = await response.json();
            setRecipes(data.recipes); // Ajustar esto según la estructura de la API
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

    // Función para guardar los cambios de edición de receta
    const handleSaveRecipe = (updatedRecipe) => {
        // Aquí harías la lógica para guardar la receta (ejemplo: un POST o PUT a la API)
        console.log("Receta actualizada:", updatedRecipe);
        setIsEditing(false); // Cierra el modal de edición
    };

    // Función para eliminar la receta
    const handleDeleteRecipe = () => {
        console.log("Eliminar receta:", selectedRecipe);
        // Aquí agregarías la lógica para eliminar la receta de la base de datos
        setIsViewing(false); // Cierra el modal después de eliminar
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
            <div>
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                <button onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>

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
}

export default RecipesPage;

