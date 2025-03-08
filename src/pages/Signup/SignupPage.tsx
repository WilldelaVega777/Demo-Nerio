import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';
import { validateLicenseKey } from '../../services/licenseService';
import axios from 'axios';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  licenseKey: string;
}

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    licenseKey: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate license key
      const licenseKeyValidation = await validateLicenseKey(formData.licenseKey);
      if (!licenseKeyValidation.valid) {
        throw new Error('Invalid or expired license key');
      }

      // Attempt signup
      const success = await signup({
        email: formData.email,
        password: formData.password,
        licenseKey: formData.licenseKey
      });

      if (success) {
        // Redirect to dashboard on success
        navigate('/dashboard');
      } else {
        throw new Error('Failed to create account');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred during signup');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="licenseKey"
            label="License Key"
            id="licenseKey"
            value={formData.licenseKey}
            onChange={handleChange}
            helperText="Enter your license key to activate your account"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};