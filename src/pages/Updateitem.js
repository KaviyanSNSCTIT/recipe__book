  import React, { useState, useEffect } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
  import ThumbUpIcon from '@mui/icons-material/ThumbUp';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { toast, ToastContainer } from 'react-toastify';
  // import 'react-toastify/dist/ReactToastify.css';
  import './RecipeUpdate.css'
  import axios from 'axios';
  import { TextField } from '@mui/material';
  import Tooltip from '@mui/material/Tooltip';
  import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

  export function RecipeCard({ recipe, onDelete, onSearchChange, searchInput, filteredRecipes, setFilteredRecipes, recipes, setRecipes }) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
   
    const [isLiked, setIsLiked] = useState(false);
    
    const [isDisliked, setIsDisliked] = useState(false);
    
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
    
        // If dislike is enabled, reset it
        if (isDisliked) {
          setDislikes(dislikes - 1);
          setIsDisliked(false);
          // Save "dislike" information in local storage
          localStorage.setItem(`dislike-${recipe._id}`, 'false');
        }
      }
    };
    
    const handleDislikeClick = () => {
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
        // Save "dislike" information in local storage
        localStorage.setItem(`dislike-${recipe._id}`, 'false');
      } else {
        setDislikes(dislikes + 1);
        setIsDisliked(true);
        // Save "dislike" information in local storage
        localStorage.setItem(`dislike-${recipe._id}`, 'true');
    
        // If like is enabled, reset it
        if (isLiked) {
          setLikes(likes - 1);
          setIsLiked(false);
          // Save "like" information in local storage
          localStorage.setItem(`like-${recipe._id}`, 'false');
        }
      }
    };
    
  
    const dislikeButtonColor = isDisliked ? 'red' : 'initial';
    useEffect(() => {
      // Load "like" information from local storage
      const liked = localStorage.getItem(`like-${recipe._id}`);
      if (liked === 'true') {
        setIsLiked(true);
      }
    
      // Load "dislike" information from local storage
      const disliked = localStorage.getItem(`dislike-${recipe._id}`);
      if (disliked === 'true') {
        setIsDisliked(true);
      }
    }, [recipe._id]);

    const handleDeleteClick = (id) => {
      axios
        .delete(`https://recipesbackend-7dop.onrender.com/media/delete/${id}`)
        .then(() => {
          const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
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

    const likeButtonColor = isLiked ? 'orange' : 'initial';

    return (
      <div className="recipe-card">
        <img src={recipe.image} alt={recipe.recipe} />
        <div className="recipe-card-info">
          {editMode ? (
            <div style={{ display: 'flex', marginTop: '40px' }}>
              <TextField
                sx={{ mr: '10px' }}
                label="Recipe"
                type="text"
                value={editedRecipeName}
                onChange={(e) => setEditedRecipeName(e.target.value)}
                size="small"
              />
              <Tooltip title="Save">
                <FontAwesomeIcon icon={faSave} onClick={handleSaveClick} size="2x" />
              </Tooltip>

            </div>
          ) : (
            <>
              <p className="recipe-title">{recipe.recipe}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="Edit">
                  <FontAwesomeIcon icon={faEdit} onClick={handleEditClick} />
                </Tooltip>
              </div>
            </>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            <Tooltip title="Like">
              <ThumbUpIcon
                style={{ marginTop: '10px', color: likeButtonColor }}
                onClick={handleLikeClick}
              />
            </Tooltip>
            <Tooltip title="Dislike">
               <ThumbDownAltIcon style={{ marginTop: '10px',marginLeft:'15px', color: dislikeButtonColor }} onClick={handleDislikeClick} />
            </Tooltip>
            </div>
            <div>
            <Tooltip title="Delete">
              <DeleteIcon
                style={{ marginTop: '10px', cursor: 'pointer' }}
                onClick={() => handleDeleteClick(recipe._id)}
              />
            </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default function RecipeList() {
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
        <div className="previous-searches section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search ..."
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button className="btn" onClick={() => handleSearchChange({ target: { value: searchInput } })}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="recipes-container">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onDelete={handleDeleteRecipe}
                onSearchChange={handleSearchChange}
                searchInput={searchInput}
                filteredRecipes={filteredRecipes}
                recipes={recipes}
                setRecipes={setRecipes}
                setFilteredRecipes={setFilteredRecipes}
              />
            ))
          ) : (
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              No recipes available.
            </h1>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }
