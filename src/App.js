import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Ensure you have firebase initialized here
import TaskList from './Components/Pages/TaskList';
import TaskForm from './Components/Pages/TaskForm';
import TaskCalendar from './Components/Pages/TaskCalendar';
import WelcomePage from './Components/Pages/WelcomePage';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress from MUI
import Box from '@mui/material/Box';
import AppLayout from './Components/Layout/AppLayout';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/welcome" element={<WelcomePage />} />
        
        {/* Private Routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <AppLayout>
                <TaskList />
              </AppLayout>
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
         <Route 
          path="/home" 
          element={
            isAuthenticated ? (
              <AppLayout>
                <TaskList />
              </AppLayout>
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
        <Route 
          path="/add-task" 
          element={
            isAuthenticated ? (
              <AppLayout>
                <TaskForm />
              </AppLayout>
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
        <Route 
          path="/calendar" 
          element={
            isAuthenticated ? (
              <AppLayout>
                <TaskCalendar />
              </AppLayout>
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
        <Route 
          path="/edit-task/:id" 
          element={
            isAuthenticated ? (
              <AppLayout>
                <TaskForm />
              </AppLayout>
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
