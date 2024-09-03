import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage/RecipesPage';
import CreateRecipePage from './pages/CreateRecipePage/CreateRecipePage';

function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<RecipesPage />}/>
        <Route path={"/recipe-form"} element={<CreateRecipePage/>}/>
        <Route path={"/recipe-form/:id"} element={<CreateRecipePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;