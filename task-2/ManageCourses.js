import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { courses } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManageCourses = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseList, setCourseList] = useState(
    courses.filter(course => course.teacher === currentUser?.name)
  );

  const categories = ['Programming', 'Design', 'Data Science', 'Business'];

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourseList(courseList.filter(c => c.id !== courseId));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  const handleSaveCourse = () => {
    // In a real app, you would save to backend
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Manage Courses</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/teacher/add-course')}
        >
          Add New Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Lessons</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseList.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.enrolledStudents}</TableCell>
                <TableCell>{course.lessons?.length || 0}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <Chip 
                    label="Active" 
                    color="success" 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => console.log('View', course.id)}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="info"
                    onClick={() => handleEdit(course)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(course.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Course Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Course Title"
              value={selectedCourse?.title || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={selectedCourse?.description || ''}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Category"
              value={selectedCourse?.category || ''}
              margin="normal"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Duration"
              value={selectedCourse?.duration || ''}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCourse} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCourses;