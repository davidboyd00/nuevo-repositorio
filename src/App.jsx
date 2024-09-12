import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipesPage from './pages/RecipesPage/RecipesPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';  // Asegúrate de que la ruta sea correcta
import CreateRecipePage from './pages/CreateRecipePage/CreateRecipePage.jsx';

function App() {
  return (
    <Router>
      {/* La Navbar estará siempre visible en todas las páginas */}
      <Navbar />

      <Routes>
        {/* RecipesPage será la página principal al abrir la app */}
        <Route path="/" element={<RecipesPage />} />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
