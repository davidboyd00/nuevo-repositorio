import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipesPage from './pages/RecipesPage/RecipesPage.jsx';
import CreateRecipePage from './pages/CreateRecipePage/CreateRecipePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal con todas las recetas */}
        <Route path="/" element={<RecipesPage />} />
        
        {/* Página para crear una nueva receta */}
        <Route path="/create-recipe" element={<CreateRecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
