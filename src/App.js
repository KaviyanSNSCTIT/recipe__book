import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
// import Settings from "./pages/Settings";
import RecipeForm from "./pages/Additem";
import Updateitem from "./pages/Updateitem";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
         
           <Route path="/updateRecipe" element={<Updateitem />} />
           <Route path="/addRecipe" element={<RecipeForm/>}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
