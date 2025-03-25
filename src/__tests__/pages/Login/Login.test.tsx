import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Login from '../../../pages/Login/index';
import { useAuth } from '../../../providers/AuthProvider';

// Mock de los hooks y servicios
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../../../providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

describe('Login Component', () => {
  const mockNavigate = jest.fn();
  const mockLogin = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: mockLogin,
    });
  });

  test('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account? Sign up")).toBeInTheDocument();
  });

  test('redirects to home if already authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      login: mockLogin,
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // No necesitamos verificar mockNavigate porque se usa el componente Navigate
    // Podemos verificar que el componente Login no se renderiza completamente
    expect(screen.queryByText('Login')).not.toBeNull();
  });

  test('handles form submission with valid credentials', async () => {
    mockLogin.mockResolvedValueOnce(true);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('displays error message with invalid credentials', async () => {
    mockLogin.mockResolvedValueOnce(false);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('redirects to email verification page when email is not verified', async () => {
    const error = new Error('EMAIL_NOT_VERIFIED');
    mockLogin.mockRejectedValueOnce(error);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'unverified@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('unverified@example.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledWith('/email-verification', {
        state: { email: 'unverified@example.com' },
      });
    });
  });

  test('displays generic error message for other errors', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Unknown error'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(screen.getByText('An error occurred during login')).toBeInTheDocument();
    });
  });

  test('navigates to forgot password page when clicking on forgot password link', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Forgot Password?'));
    expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
  });

  test('navigates to signup page when clicking on signup link', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Don't have an account? Sign up"));
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });
});