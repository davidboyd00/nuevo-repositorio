import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';  // Asegúrate de que la ruta sea correcta
import RecipesPage from './pages/RecipesPage/RecipesPage.jsx'; // Página de recetas
import CreateRecipePage from './pages/CreateRecipePage/CreateRecipePage.jsx'; // Página para crear receta

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipesPage />} />  {/* RecipesPage como página de inicio */}
        <Route path="/create" element={<CreateRecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
