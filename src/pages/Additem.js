import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Input, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2rem',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    background: 'white',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#4CAF50', // Green color
  },
  textField: {
    marginBottom: '1.5rem',
  },
  uploadInput: {
    display: 'none',
  },
  uploadButton: {
    background: '#4CAF50', // Green color
    color: 'white',
    borderRadius: '4px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'background 0.3s',
    '&:hover': {
      background: '#45A049', // Darker green color on hover
    },
  },
  submitButton: {
    background: '#4CAF50', // Green color
    color: 'white',
    padding: '12px',
    marginTop: '1rem',
  },
  imagePreview: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  clearImageButton: {
    marginLeft: '1rem',
  },
  errorText: {
    color: 'red',
  },
};

const CreateMediaForm = () => {
  const [recipe, setRecipe] = useState('');
  const [image, setImage] = useState(null);
  const [recipeError, setRecipeError] = useState('');
  const [imageError, setImageError] = useState('');

  const handleRecipeChange = (e) => {
    setRecipe(e.target.value);
    setRecipeError('');
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageError('');
  };

  const handleImageClear = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setRecipeError('');
    setImageError('');
  
    let isValid = true;
  
    if (!recipe) {
      setRecipeError('Recipe is required.');
      isValid = false;
    }
  
    if (!image) {
      setImageError('Image is required.');
      isValid = false;
    }
  
    if (!isValid) {
      return;
    }
  
    const formData = new FormData();
    formData.append('recipe', recipe);
    formData.append('image', image);
  
    axios
      .post('https://recipesbackend-7dop.onrender.com/media/create', formData)
      .then((response) => {
        console.log('Media created successfully:', response.data);
        toast.success('Recipe created successfully, look on the recipe page');
  
        // Clear the form fields after a successful submission
        setRecipe('');
        setImage(null);
      })
      .catch((error) => {
        console.error('Error creating media:', error);
        toast.error('Error in creating media');
      });
  };
  

  return (
    <Container maxWidth="sm" style={styles.container}>
      <Paper elevation={3} style={styles.form}>
        <Typography variant="h5" sx={styles.title}>
          Recipe Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Recipe"
            id="recipe"
            value={recipe}
            onChange={handleRecipeChange}
            fullWidth
            style={styles.textField}
            error={Boolean(recipeError)}
            helperText={recipeError}
          />
          {image && (
            <div style={styles.imagePreview}>
              <img src={URL.createObjectURL(image)} alt="Preview" width="100" height="100" />
              <IconButton
                color="primary"
                aria-label="Clear image"
                component="span"
                onClick={handleImageClear}
                style={styles.clearImageButton}
              >
                <ClearIcon />
              </IconButton>
            </div>
          )}
          <label htmlFor="image">
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.uploadInput}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              fullWidth
              style={styles.uploadButton}
              error={Boolean(imageError)}
            >
              {imageError ? 'Image is required' : 'Upload Image'}
            </Button>
          </label>
          <Button type="submit" variant="contained" color="primary" fullWidth style={styles.submitButton}>
            <SendIcon /> Create Recipe
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default CreateMediaForm;
