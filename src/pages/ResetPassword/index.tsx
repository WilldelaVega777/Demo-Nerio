import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
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
    setSuccess('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error resetting password');
      }

      setSuccess('Password has been successfully reset');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: '40px auto', padding: '24px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Reset Password
      </Typography.Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: '24px' }}
        />
      )}

      {success && (
        <Alert
          message={success}
          type="success"
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
          label="New Password"
          name="password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your new password!' }]}
        >
          <Input.Password
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="link"
            block
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};