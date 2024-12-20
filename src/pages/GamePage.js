import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../services/api';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState({
    name: 'avatar',
    image: 'aaa',
    description: 'aaaaaaaaaaaaaaaaa',
    genre: 'gggggggg',
    price: '50',
    releaseDate: '20-12-2024',
  });
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await getGameById(id);
        setGame(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };
    fetchGameDetails();
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    const commentData = {
      id: comments.length + 1,
      text: newComment,
      date: new Date().toLocaleString(),
    };
    setComments([...comments, commentData]);
    setNewComment('');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Blurred Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${game.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(15px)',
          zIndex: -1,
        }}
      ></Box>

      <Container maxWidth="md" sx={{ py: 4, position: 'relative' }}>
        <Card
          sx={{
            boxShadow: 3,
            overflow: 'hidden',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <CardMedia
            component="img"
            alt={game.name}
            height="300"
            image={`${game.image}`}
            sx={{
              objectFit: 'cover',
              maxHeight: '300px',
            }}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {game.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {game.description}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              <strong>Genre:</strong> {game.genre}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              <strong>Price:</strong> {game.price} USD
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              <strong>Release Date:</strong> {game.releaseDate}
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Comment Section */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>

        {/* Comment Form */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            variant="outlined"
            label="Add a comment"
            fullWidth
            value={newComment}
            onChange={handleCommentChange}
            multiline
            rows={3}
            sx={{ backgroundColor: 'white', height: '102px', border: '15px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
          >
            Submit
          </Button>
        </Box>

        {/* Comments List */}
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: 2,
            borderRadius: 2,
            boxShadow: 2,
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <List>
            {comments.map((comment) => (
              <ListItem
                key={comment.id}
                sx={{ borderBottom: '1px solid #ddd', color: 'red' }}
              >
                <ListItemText
                  primary={comment.text}
                  secondary={`Posted on ${comment.date}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default GamePage;
