import React, { createContext, useState, useContext } from 'react';
import { users } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (email, password) => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email);
        if (user && password === 'password') { // Simple mock password check
          setCurrentUser(user);
          setLoading(false);
          resolve(user);
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};