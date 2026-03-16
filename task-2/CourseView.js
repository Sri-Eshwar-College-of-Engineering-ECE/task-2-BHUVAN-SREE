import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider,
  Chip,
  LinearProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../../data/mockData';
import {
  PlayCircleOutline as PlayIcon,
  CheckCircleOutline as CheckIcon
} from '@mui/icons-material';

const CourseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id));

  const [lessons, setLessons] = useState(course?.lessons || []);

  const handleLessonComplete = (lessonId) => {
    setLessons(lessons.map(lesson =>
      lesson.id === lessonId
        ? { ...lesson, completed: !lesson.completed }
        : lesson
    ));
  };

  const completedCount = lessons.filter(l => l.completed).length;
  const progress = (completedCount / lessons.length) * 100;

  if (!course) {
    return (
      <Box>
        <Typography variant="h5">Course not found</Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back to Courses
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {course.description}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip label={`Teacher: ${course.teacher}`} />
          <Chip label={`Category: ${course.category}`} />
          <Chip label={`Duration: ${course.duration}`} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Overall Progress: {Math.round(progress)}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ mt: 1 }}
          />
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Course Content
      </Typography>

      <Paper>
        <List>
          {lessons.map((lesson, index) => (
            <React.Fragment key={lesson.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={lesson.completed}
                    onChange={() => handleLessonComplete(lesson.id)}
                    icon={<PlayIcon />}
                    checkedIcon={<CheckIcon />}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={lesson.title}
                  secondary={`Duration: ${lesson.duration}`}
                />
                <Button 
                  variant="outlined" 
                  size="small"
                  startIcon={<PlayIcon />}
                >
                  Play
                </Button>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default CourseView;