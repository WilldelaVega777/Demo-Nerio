//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import { FC, useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { resendVerificationEmail } from '../../services/authService';
import './Login.css';
import { Input, Button, Form, Typography, Alert, Card } from 'antd';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface LoginProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const Login: FC<LoginProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUnverifiedEmail('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      // Verificar si el error es debido a que el correo no está verificado
      if (err instanceof Error && err.message === 'EMAIL_NOT_VERIFIED') {
        // Redirigir a la página de verificación de correo
        navigate('/email-verification', { state: { email: username } });
        return;
      } else {
        setError('An error occurred during login');
        console.error('Login error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }; // Added missing closing brace here

  //--------------------------------------------------------------------------------------
  // Variables Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // Events Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // UseEffects Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Card className="login-card" style={{ maxWidth: 400, margin: '40px auto', padding: '24px', background: '#1f1f1f' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Login
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
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Login
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="link"
            block
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Button>
          <Button
            type="link"
            block
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;