import React, { useState,useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import './RecipeCard.css'; // Import the CSS file
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function RecipeCard({ recipe, onDelete,setFilteredRecipes, recipes, setRecipes }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedRecipeName, setEditedRecipeName] = useState(recipe.recipe);

  useEffect(() => {
    // Load "like" information from local storage
    const liked = localStorage.getItem(`like-${recipe._id}`);
    if (liked === 'true') {
      setIsLiked(true);
    }
  }, [recipe._id]);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
      // Save "like" information in local storage
      localStorage.setItem(`like-${recipe._id}`, 'false');
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      // Save "like" information in local storage
      localStorage.setItem(`like-${recipe._id}`, 'true');
    }
  };
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = () => {
    // Make an API request to update the recipe name
    axios
      .put(`https://recipesbackend-7dop.onrender.com/media/update/${recipe._id}`, { recipe: editedRecipeName })
      .then(() => {
        // Update the local state with the new recipe name
        const updatedRecipes = recipes.map((r) => (r._id === recipe._id ? { ...r, recipe: editedRecipeName } : r));
        setRecipes(updatedRecipes);
        setFilteredRecipes(updatedRecipes);

        // Show a success toast notification
        toast.success('Recipe name updated successfully');

        // Exit edit mode
        setEditMode(false);
      })
      .catch((error) => {
        console.error('Error updating recipe name:', error);

        // Show an error toast notification
        toast.error('Error updating recipe name');
      });
  };

  

  const handleDeleteClick = () => {
    onDelete(recipe._id);
  };

  const likeButtonColor = isLiked ? 'orange' : 'initial';

  return (
    <div className="recipe-card">
      <img className="recipe-card-image" src={recipe.image} alt={recipe.recipe} />
      <div className="recipe-card-info">
        
        <p className="recipe-title">{recipe.recipe}</p>
        <div className="icon-container">
          <Tooltip title="Like">
            <ThumbUpIcon style={{ color: likeButtonColor }} onClick={handleLikeClick} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteIcon style={{ cursor: 'pointer' }} onClick={handleDeleteClick} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
