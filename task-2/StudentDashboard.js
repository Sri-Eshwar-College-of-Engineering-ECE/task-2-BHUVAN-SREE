import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Button
} from '@mui/material';
import {
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Grade as GradeIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { courses, statistics } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const studentStats = statistics.student;

  const enrolledCourses = courses.filter(course => 
    currentUser?.enrolledCourses?.includes(course.id)
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {currentUser?.name}!
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white'
            }}
          >
            <SchoolIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{studentStats.totalCourses}</Typography>
              <Typography variant="body2">Enrolled Courses</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
              color: 'white'
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{studentStats.completedCourses}</Typography>
              <Typography variant="body2">Completed</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)',
              color: 'white'
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{studentStats.totalHours}h</Typography>
              <Typography variant="body2">Learning Hours</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)',
              color: 'white'
            }}
          >
            <GradeIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{studentStats.averageGrade}%</Typography>
              <Typography variant="body2">Average Grade</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* My Courses */}
      <Typography variant="h5" gutterBottom>
        My Courses
      </Typography>
      
      <Grid container spacing={3}>
        {enrolledCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
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
    </Box>
  );
};

export default StudentDashboard;