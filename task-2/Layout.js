import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!currentUser) {
    return children;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          mt: '64px'
        }}
      >
        <Toolbar /> {/* This creates space for the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;