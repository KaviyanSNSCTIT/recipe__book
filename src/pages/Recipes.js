import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import RecipeCard from '../components/RecipeCard';
import PreviousSearches from '../components/PreviousSearches';
import axios from 'axios';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('https://recipesbackend-7dop.onrender.com/media/getall/')
      .then((response) => {
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const newSearchInput = event.target.value;
    setSearchInput(newSearchInput);

    const filteredRecipes = recipes.filter((recipe) =>
      recipe.recipe.toLowerCase().includes(newSearchInput.toLowerCase())
    );
    setFilteredRecipes(filteredRecipes);
  };

  const handleDeleteRecipe = (id) => {
    axios
      .delete(`https://recipesbackend-7dop.onrender.com/media/delete/${id}`)
      .then(() => {
        const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
        setRecipes(updatedRecipes);
        setFilteredRecipes(updatedRecipes);

        // Show a success toast notification
        toast.success('Recipe deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting recipe:', error);

        // Show an error toast notification
        toast.error('Error deleting recipe');
      });
  };

  return (
    <div>
      <PreviousSearches searchInput={searchInput} onSearchChange={handleSearchChange} />
      <div className="recipes-container">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onDelete={handleDeleteRecipe} />
          ))
        ) : (
          <h1 style={{display:'flex',justifyContent:'center',alignItems:'center'}}>No recipes available.</h1>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
