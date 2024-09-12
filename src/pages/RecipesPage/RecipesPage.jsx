import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para la redirección
import getRecipes from "../../services/fetch/getRecipes";  
import deleteRecipe from "../../services/delete/deleteRecipe";  
import updateRecipe from "../../services/patch/updateRecipe";  
import createRecipe from "../../services/post/createRecipe";  
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx"; 
import RecipeModal from "../../components/RecipeModal/RecipeModal.jsx";
import RecipeEditModal from "../../components/RecipeModal/RecipeEditModal.jsx";
import PageSelector from "../../components/PageSelector/PageSelector.jsx";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const navigate = useNavigate();  // Inicializa el hook para la redirección

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes(page);  
                setRecipes(data.recipes);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error("Error al obtener las recetas:", error);
            }
        };

        fetchRecipes();
    }, [page]);

    const handleViewRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsViewing(true);
    };

    const handleEditRecipe = () => {
        setIsEditing(true);
        setIsViewing(false);
    };

    const handleSaveRecipe = async (updatedRecipe) => {
        try {
            const updatedData = await updateRecipe(updatedRecipe.id, updatedRecipe);  
            setRecipes(prevRecipes =>
                prevRecipes.map(r => r.id === updatedRecipe.id ? updatedData : r)
            );
            setIsEditing(false);
            console.log("Receta actualizada con éxito");
        } catch (error) {
            console.error("Error al actualizar la receta:", error);
        }
    };

    const handleDeleteRecipe = async () => {
        try {
            await deleteRecipe(selectedRecipe.id);  
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== selectedRecipe.id));
            setIsViewing(false);
            console.log("Receta eliminada con éxito");
        } catch (error) {
            console.error("Error al eliminar la receta:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Función para redirigir a la página de creación de recetas
    const handleNavigateToCreateRecipe = () => {
        navigate('/create-recipe');  // Redirige a la página de creación
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

            {/* Botón para crear nueva receta */}
            <button onClick={handleNavigateToCreateRecipe} style={{ marginTop: '20px' }}>
                Crear Nueva Receta
            </button>

            <PageSelector 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />

            {isViewing && 
                <RecipeModal 
                    recipe={selectedRecipe} 
                    onClose={() => setIsViewing(false)} 
                    onEdit={handleEditRecipe} 
                    onDelete={handleDeleteRecipe} 
                />
            }

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
