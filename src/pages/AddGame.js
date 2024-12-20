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
  IconButton,
  Avatar,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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

  const handleImageUpload = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(JSON.stringify(formData, null, 2));
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
              >
                {genres.map((genre) => (
                  <MenuItem key={genre.value} value={genre.value}>
                    {genre.label}
                  </MenuItem>
                ))}
              </Select>
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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#bb86fc',
                '&:hover': { backgroundColor: '#9a67ea' },
              }}
            >
              Add Game
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddGame;
