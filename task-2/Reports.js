import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('enrollment');
  const [timeRange, setTimeRange] = useState('month');

  const enrollmentData = [
    { month: 'Jan', enrollments: 45 },
    { month: 'Feb', enrollments: 52 },
    { month: 'Mar', enrollments: 68 },
    { month: 'Apr', enrollments: 74 },
    { month: 'May', enrollments: 89 },
    { month: 'Jun', enrollments: 95 }
  ];

  const completionData = [
    { course: 'React', rate: 78 },
    { course: 'JavaScript', rate: 82 },
    { course: 'Python', rate: 71 },
    { course: 'UI/UX', rate: 65 },
    { course: 'Data Science', rate: 58 }
  ];

  const categoryData = [
    { name: 'Programming', students: 145 },
    { name: 'Design', students: 89 },
    { name: 'Data Science', students: 67 },
    { name: 'Business', students: 45 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const topCourses = [
    { course: 'React for Beginners', students: 45, completion: 78, rating: 4.8 },
    { course: 'Advanced JavaScript', students: 38, completion: 82, rating: 4.6 },
    { course: 'Python for Data Science', students: 32, completion: 71, rating: 4.7 },
    { course: 'UI/UX Design', students: 28, completion: 65, rating: 4.5 }
  ];

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
    alert(`Report exported as ${format}`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reports & Analytics</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('PDF')}
            sx={{ mr: 1 }}
          >
            PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('Excel')}
            sx={{ mr: 1 }}
          >
            Excel
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Print
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="enrollment">Enrollment Report</MenuItem>
                <MenuItem value="completion">Completion Report</MenuItem>
                <MenuItem value="revenue">Revenue Report</MenuItem>
                <MenuItem value="engagement">Engagement Report</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="week">Last Week</MenuItem>
                <MenuItem value="month">Last Month</MenuItem>
                <MenuItem value="quarter">Last Quarter</MenuItem>
                <MenuItem value="year">Last Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" fullWidth>
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Enrollments
              </Typography>
              <Typography variant="h4">423</Typography>
              <Typography variant="body2" color="success.main">
                ↑ 12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="h4">71%</Typography>
              <Typography variant="body2" color="success.main">
                ↑ 5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Rating
              </Typography>
              <Typography variant="h4">4.6</Typography>
              <Typography variant="body2" color="success.main">
                ↑ 0.3 from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Students
              </Typography>
              <Typography variant="h4">245</Typography>
              <Typography variant="body2" color="success.main">
                ↑ 18 from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Enrollment Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrollments" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Students by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="students"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Course Completion Rates
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Top Performing Courses */}
      <Typography variant="h5" gutterBottom>
        Top Performing Courses
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell align="right">Enrolled Students</TableCell>
              <TableCell align="right">Completion Rate</TableCell>
              <TableCell align="right">Average Rating</TableCell>
              <TableCell align="right">Performance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topCourses.map((course) => (
              <TableRow key={course.course}>
                <TableCell component="th" scope="row">
                  {course.course}
                </TableCell>
                <TableCell align="right">{course.students}</TableCell>
                <TableCell align="right">{course.completion}%</TableCell>
                <TableCell align="right">{course.rating}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box
                      sx={{
                        width: 100,
                        height: 10,
                        bgcolor: '#e0e0e0',
                        borderRadius: 5,
                        mr: 1
                      }}
                    >
                      <Box
                        sx={{
                          width: `${course.completion}%`,
                          height: 10,
                          bgcolor: course.completion > 75 ? '#4caf50' : '#ff9800',
                          borderRadius: 5
                        }}
                      />
                    </Box>
                    {course.completion}%
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Reports;