import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const getMenuItems = () => {
    switch (currentUser?.role) {
      case 'student':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/student' },
          { text: 'My Courses', icon: <SchoolIcon />, path: '/student/courses' },
          { text: 'Assignments', icon: <AssignmentIcon />, path: '/student/assignments' }
        ];
      case 'teacher':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher' },
          { text: 'My Courses', icon: <SchoolIcon />, path: '/teacher/courses' },
          { text: 'Add Course', icon: <AddIcon />, path: '/teacher/add-course' },
          { text: 'Students', icon: <PeopleIcon />, path: '/teacher/students' }
        ];
      case 'admin':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
          { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
          { text: 'Reports', icon: <AssessmentIcon />, path: '/admin/reports' }
        ];
      default:
        return [];
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {getMenuItems().map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              navigate(item.path);
              handleDrawerToggle();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;