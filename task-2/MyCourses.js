import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const enrolledCourses = courses.filter(course => 
    currentUser?.enrolledCourses?.includes(course.id)
  );

  const availableCourses = courses.filter(course => 
    !currentUser?.enrolledCourses?.includes(course.id)
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        In Progress
      </Typography>
      
      <Grid container spacing={3}>
        {enrolledCourses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Progress: {course.progress}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progress} 
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={() => navigate(`/student/course/${course.id}`)}
                >
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Available Courses
      </Typography>

      <Grid container spacing={3}>
        {availableCourses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={course.category} 
                    size="small" 
                    sx={{ mr: 1 }} 
                  />
                  <Chip 
                    label={`${course.duration}`} 
                    size="small" 
                  />
                </Box>
                <Button variant="outlined" size="small">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyCourses;