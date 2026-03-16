import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import CourseView from './pages/student/CourseView';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ManageCourses from './pages/teacher/ManageCourses';
import AddCourse from './pages/teacher/AddCourse';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';

import './App.css';

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/course/:id"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <CourseView />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ManageCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/add-course"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <AddCourse />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to={`/${currentUser.role}`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;