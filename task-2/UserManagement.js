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
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { users } from '../../data/mockData';

const UserManagement = () => {
  const [userList, setUserList] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState('all');

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUserList(userList.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUserList(userList.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    // In a real app, you would save to backend
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const filteredUsers = userList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedUser(null);
            setOpenDialog(true);
          }}
        >
          Add New User
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Role</InputLabel>
            <Select
              value={filterRole}
              label="Filter by Role"
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="student">Students</MenuItem>
              <MenuItem value="teacher">Teachers</MenuItem>
              <MenuItem value="admin">Admins</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Joined Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={user.avatar} sx={{ mr: 2 }} />
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role}
                    color={
                      user.role === 'admin' ? 'error' :
                      user.role === 'teacher' ? 'primary' : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.status || 'active'}
                    color={(user.status || 'active') === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {user.enrolledCourses?.length || user.teachingCourses?.length || 0}
                </TableCell>
                <TableCell>2024-01-15</TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    color="info"
                    onClick={() => handleEdit(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color={user.status === 'active' ? 'warning' : 'success'}
                    onClick={() => handleToggleStatus(user.id)}
                  >
                    {user.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              defaultValue={selectedUser?.name || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              defaultValue={selectedUser?.email || ''}
              margin="normal"
            />
            {!selectedUser && (
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
              />
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                defaultValue={selectedUser?.role || 'student'}
                label="Role"
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                defaultValue={selectedUser?.status || 'active'}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">
            {selectedUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;