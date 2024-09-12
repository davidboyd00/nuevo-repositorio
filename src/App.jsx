// App.jsx
import React from 'react';
import './src/App.css';  // Importa el archivo CSS aquí
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipesPage from './pages/RecipesPage/RecipesPage.jsx';
import CreateRecipePage from './pages/CreateRecipePage/CreateRecipePage.jsx';

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
