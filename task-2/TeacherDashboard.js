import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { courses, statistics } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const teacherStats = statistics.teacher;

  const teachingCourses = courses.filter(course => 
    course.teacher === currentUser?.name
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Teacher Dashboard
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
            <PeopleIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{teacherStats.totalStudents}</Typography>
              <Typography variant="body2">Total Students</Typography>
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
            <SchoolIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{teacherStats.activeCourses}</Typography>
              <Typography variant="body2">Active Courses</Typography>
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
            <StarIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{teacherStats.averageRating}</Typography>
              <Typography variant="body2">Avg Rating</Typography>
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
            <TrendingUpIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{teacherStats.totalCourses}</Typography>
              <Typography variant="body2">Total Courses</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* My Courses */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">My Courses</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/teacher/add-course')}
        >
          Add New Course
        </Button>
      </Box>

      <Grid container spacing={3}>
        {teachingCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">
                    Students: {course.enrolledStudents}
                  </Typography>
                  <Typography variant="body2">
                    Lessons: {course.lessons?.length || 0}
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/teacher/courses')}
                >
                  Manage Course
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Recent Student Activity
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Lesson</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Last Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>John Smith</TableCell>
              <TableCell>React for Beginners</TableCell>
              <TableCell>Hooks Overview</TableCell>
              <TableCell>75%</TableCell>
              <TableCell>2 hours ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Emma Wilson</TableCell>
              <TableCell>Advanced JavaScript</TableCell>
              <TableCell>Async/Await</TableCell>
              <TableCell>40%</TableCell>
              <TableCell>5 hours ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Michael Brown</TableCell>
              <TableCell>React for Beginners</TableCell>
              <TableCell>Components</TableCell>
              <TableCell>90%</TableCell>
              <TableCell>1 day ago</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeacherDashboard;