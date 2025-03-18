import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error requesting password reset');
      }

      setSuccess('Password reset instructions have been sent to your email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: '40px auto', padding: '24px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Forgot Password
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
          label="Email Address"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            {isLoading ? 'Sending...' : 'Reset Password'}
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