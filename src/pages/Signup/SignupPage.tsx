import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { useAuth } from '../../providers/AuthProvider';
import { validateLicenseKey } from '../../services/licenseService';
import { checkEmailExists } from '../../services/authService';
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
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        throw new Error('This email is already registered');
      }

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
        // Redirect to email verification page on success
        navigate('/email-verification', { state: { email: formData.email } });
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
    <Card style={{ maxWidth: 400, margin: '40px auto', padding: '24px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Sign up
      </Typography.Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: '24px' }}
        />
      )}

      <Form
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' }
          ]}
        >
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            style={{ backgroundColor: '#2a2a2a' }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ backgroundColor: '#2a2a2a' }}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ backgroundColor: '#2a2a2a' }}
          />
        </Form.Item>

        <Form.Item
          label="License Key"
          name="licenseKey"
          rules={[{ required: true, message: 'Please input your license key!' }]}
          extra="Enter your license key to activate your account"
        >
          <Input
            name="licenseKey"
            value={formData.licenseKey}
            onChange={handleChange}
            style={{ backgroundColor: '#2a2a2a' }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="link"
            block
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};