import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { addGame } from "../services/api";
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Initialize Supabase client
const supabaseUrl = 'https://uocydybukiajyblhwwec.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvY3lkeWJ1a2lhanlibGh3d2VjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzc3MTA5MywiZXhwIjoyMDQ5MzQ3MDkzfQ.MjsPMsuhmx3C0v9WZBp2NnRAvb2br-YmcAariLgacGA';
const supabase = createClient(supabaseUrl, supabaseKey);

const AddGame = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    imagePreview: null,
    description: '',
    genre: '',
    price: '',
    releaseDate: '',
  });

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate(); // Hook for navigation

  const genres = [
    { label: 'Action', value: 'action' },
    { label: 'Adventure', value: 'adventure' },
    { label: 'RPG', value: 'rpg' },
    { label: 'Strategy', value: 'strategy' },
    { label: 'Sports', value: 'sports' },
    { label: 'Simulation', value: 'simulation' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Game title is required.';
    }

    // Validate image
    if (!formData.image) {
      newErrors.image = 'An image is required.';
    }

    // Validate genre
    if (!formData.genre) {
      newErrors.genre = 'Genre is required.';
    }

    // Validate price
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number.';
    }

    // Validate release date
    if (!formData.releaseDate) {
      newErrors.releaseDate = 'Release date is required.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Start loading
    setErrors({}); // Clear previous errors

    try {
      console.log("Uploading image...");
      // Upload the image to Supabase
      const uniqueFileName = `public/${Date.now()}_${formData.image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("game-images")
        .upload(uniqueFileName, formData.image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Error uploading image to Supabase:", uploadError.message);
        setErrors({ upload: "Failed to upload image. Please try again." });
        setLoading(false); // Stop loading
        return;
      }

      console.log("Image uploaded successfully:", uploadData);

      // Get the public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("game-images")
        .getPublicUrl(uniqueFileName);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        console.error("Error retrieving public URL for uploaded image.");
        setErrors({ upload: "Failed to retrieve image URL. Please try again." });
        setLoading(false); // Stop loading
        return;
      }

      const publicUrl = publicUrlData.publicUrl;
      console.log("Public URL of uploaded image:", publicUrl);

      // Prepare game data for submission
      const gameData = {
        name: formData.name,
        image: publicUrl,
        genre: formData.genre,
        price: formData.price,
        releaseDate: formData.releaseDate,
      };

      // Call the addGame API to store game details
      try {
        await addGame(gameData);
        console.log("Game added successfully!");

        // Reset form after successful submission
        setFormData({
          name: '',
          image: null,
          imagePreview: null,
          description: '',
          genre: '',
          price: '',
          releaseDate: '',
        });

        setLoading(false); // Stop loading
        navigate('/'); // Navigate back to home
      } catch (addError) {
        console.error("Error adding game to the database:", addError);
        setErrors({ api: "Failed to add game. Please try again." });
        setLoading(false); // Stop loading
      }
    } catch (err) {
      console.error("Unexpected error during form submission:", err);
      setErrors({ unexpected: "An unexpected error occurred. Please try again." });
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#121212', // Dark background
        minHeight: '100vh',
        py: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: '#1e1e1e', // Slightly lighter for contrast
            color: '#ffffff',
          }}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
            Add New Game
          </Typography>

          {/* Display validation errors */}
          {Object.keys(errors).length > 0 && (
            <Box sx={{ mb: 2 }}>
              {Object.values(errors).map((error, index) => (
                <Alert key={index} severity="error" sx={{ mb: 1 }}>
                  {error}
                </Alert>
              ))}
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Game Title"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              placeholder="Enter game title"
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#b3b3b3' } }}
              sx={{ '& .MuiOutlinedInput-root': { borderColor: '#424242' } }}
              error={!!errors.name}
              helperText={errors.name}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                my: 2,
              }}
            >
              <Avatar
                src={formData.imagePreview}
                alt="Game Image"
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 1,
                  backgroundColor: '#333333',
                }}
              />
              <label htmlFor="image-upload">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                  sx={{
                    backgroundColor: '#bb86fc',
                    '&:hover': { backgroundColor: '#9a67ea' },
                  }}
                >
                  Upload Image
                </Button>
              </label>
            </Box>
            {errors.image && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {errors.image}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              minRows={4}
              placeholder="Enter game description"
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#b3b3b3' } }}
              sx={{ '& .MuiOutlinedInput-root': { borderColor: '#424242' } }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel style={{ color: '#b3b3b3' }}>Genre</InputLabel>
              <Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                label="Genre"
                sx={{
                  color: '#ffffff',
                  '& .MuiSelect-icon': { color: '#ffffff' },
                }}
                error={!!errors.genre}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre.value} value={genre.value}>
                    {genre.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.genre && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.genre}
                </Alert>
              )}
            </FormControl>

            <TextField
              fullWidth
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="number"
              placeholder="Enter price"
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#b3b3b3' } }}
              sx={{ '& .MuiOutlinedInput-root': { borderColor: '#424242' } }}
              error={!!errors.price}
              helperText={errors.price}
            />

            <TextField
              fullWidth
              label="Release Date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true, style: { color: '#b3b3b3' } }}
              InputProps={{ style: { color: '#ffffff' } }}
              sx={{ '& .MuiOutlinedInput-root': { borderColor: '#424242' } }}
              error={!!errors.releaseDate}
              helperText={errors.releaseDate}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading} // Disable button when loading
              sx={{
                mt: 3,
                backgroundColor: '#bb86fc',
                '&:hover': { backgroundColor: '#9a67ea' },
              }}
            >
              {loading ? <CircularProgress size={24} color="white" /> : 'Add Game'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddGame;