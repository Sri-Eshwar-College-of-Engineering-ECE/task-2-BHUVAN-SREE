import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { statistics } from '../../data/mockData';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const adminStats = statistics.admin;

  const userGrowthData = [
    { month: 'Jan', students: 65, teachers: 8 },
    { month: 'Feb', students: 78, teachers: 10 },
    { month: 'Mar', students: 90, teachers: 12 },
    { month: 'Apr', students: 102, teachers: 14 },
    { month: 'May', students: 115, teachers: 16 },
    { month: 'Jun', students: 128, teachers: 18 }
  ];

  const courseCategoryData = [
    { name: 'Programming', value: 12 },
    { name: 'Design', value: 8 },
    { name: 'Data Science', value: 5 },
    { name: 'Business', value: 4 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const revenueData = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 28000 },
    { month: 'Jun', revenue: 32000 }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
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
              <Typography variant="h6">{adminStats.totalUsers}</Typography>
              <Typography variant="body2">Total Users</Typography>
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
              <Typography variant="h6">{adminStats.totalCourses}</Typography>
              <Typography variant="body2">Total Courses</Typography>
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
            <TrendingUpIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">{adminStats.activeStudents}</Typography>
              <Typography variant="body2">Active Students</Typography>
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
            <MoneyIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">${adminStats.revenue}</Typography>
              <Typography variant="body2">Revenue</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* User Growth Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#8884d8" />
                <Line type="monotone" dataKey="teachers" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Course Categories Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Courses by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Recent Activities
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                New Enrollments
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">John enrolled in React Course</Typography>
                <Typography variant="caption" color="text.secondary">5 minutes ago</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Sarah enrolled in Python Course</Typography>
                <Typography variant="caption" color="text.secondary">15 minutes ago</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Mike enrolled in UI/UX Course</Typography>
                <Typography variant="caption" color="text.secondary">1 hour ago</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Server Uptime: 99.9%</Typography>
                <LinearProgress variant="determinate" value={99.9} sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Storage Usage: 45%</Typography>
                <LinearProgress variant="determinate" value={45} sx={{ mt: 1 }} />
              </Box>
              <Box>
                <Typography variant="body2">Active Sessions: 78</Typography>
                <LinearProgress variant="determinate" value={78} sx={{ mt: 1 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;