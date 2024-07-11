import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setSnackbar({ open: true, message: 'Login successful', severity: 'success' });
      setTimeout(() => {
        router.push('/SearchPage');
      }, 1500);
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.message === 'data and hash arguments required') {
        setSnackbar({ open: true, message: 'Please provide username and password', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: error.response?.data?.error || 'Login failed', severity: 'error' });
      }
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      setSnackbar({ open: true, message: 'Registration successful', severity: 'success' });
      setTimeout(() => {
        setIsRegistering(false); // Switch to login mode after successful registration
      }, 1500);
    } catch (error) {
      console.error('Error registering:', error);
      if (error.message === 'data and hash arguments required') {
        setSnackbar({ open: true, message: 'Please provide username and password', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: error.response?.data?.error || 'Registration failed', severity: 'error' });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        p={3}
        width="100%"
        maxWidth="400px"
        bgcolor="white"
        boxShadow={3}
        borderRadius={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            id='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            id='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button id="submit" variant="contained" color="primary" type="submit" fullWidth>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>
        <Button onClick={() => setIsRegistering(!isRegistering)} fullWidth sx={{ mt: 2 }}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default LoginPage;
