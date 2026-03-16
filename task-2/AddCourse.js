import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    image: ''
  });

  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: '', duration: '' });

  const categories = ['Programming', 'Design', 'Data Science', 'Business'];

  const handleInputChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddLesson = () => {
    if (newLesson.title && newLesson.duration) {
      setLessons([
        ...lessons,
        {
          id: Date.now(),
          ...newLesson,
          completed: false
        }
      ]);
      setNewLesson({ title: '', duration: '' });
    }
  };

  const handleRemoveLesson = (lessonId) => {
    setLessons(lessons.filter(l => l.id !== lessonId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save to backend
    console.log('Course Data:', courseData);
    console.log('Lessons:', lessons);
    alert('Course created successfully!');
    navigate('/teacher/courses');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create New Course
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="title"
                label="Course Title"
                value={courseData.title}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="description"
                label="Course Description"
                multiline
                rows={4}
                value={courseData.description}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={courseData.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                name="duration"
                label="Duration (e.g., 8 weeks)"
                value={courseData.duration}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="image"
                label="Course Image URL"
                value={courseData.image}
                onChange={handleInputChange}
                helperText="Leave empty for default image"
              />
            </Grid>

            {/* Lessons Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Course Lessons
              </Typography>

              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label="Lesson Title"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label="Duration"
                      value={newLesson.duration}
                      onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                      placeholder="e.g., 30 min"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddLesson}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Paper>

              {lessons.length > 0 ? (
                <List>
                  {lessons.map((lesson, index) => (
                    <ListItem
                      key={lesson.id}
                      divider={index < lessons.length - 1}
                    >
                      <ListItemText
                        primary={lesson.title}
                        secondary={`Duration: ${lesson.duration}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          color="error"
                          onClick={() => handleRemoveLesson(lesson.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
                  No lessons added yet
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/teacher/courses')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={!courseData.title || !courseData.description || lessons.length === 0}
                >
                  Create Course
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddCourse;