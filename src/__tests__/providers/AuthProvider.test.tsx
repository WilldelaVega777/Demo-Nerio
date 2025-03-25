import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../providers/AuthProvider';
import { useAuthStore } from '../../stores/authStore';

// Mock de los hooks y servicios
jest.mock('../../stores/authStore', () => ({
  useAuthStore: jest.fn(),
}));

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{auth.isAuthenticated ? 'authenticated' : 'not-authenticated'}</div>
      <button onClick={() => auth.login('test@example.com', 'password')}>Login</button>
      <button onClick={() => auth.logout()}>Logout</button>
      <button onClick={() => auth.signup({ email: 'test@example.com', password: 'password', licenseKey: 'key123' })}>Signup</button>
    </div>
  );
};

describe('AuthProvider', () => {
  const mockSetToken = jest.fn();
  const mockLogout = jest.fn();
  const mockGetToken = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    
    (useAuthStore as jest.MockedFunction<typeof useAuthStore>).mockReturnValue({
      isAuthenticated: false,
      user: null,
      setToken: mockSetToken,
      logout: mockLogout,
      getToken: mockGetToken,
    });
  });

  test('provides authentication context to children', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
  });

  test('login function calls API and sets token on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ access_token: 'test-token' }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
        }),
      })
    );
    expect(mockSetToken).toHaveBeenCalledWith('test-token');
  });

  test('login function throws error when API returns error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid credentials' }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Create a spy on console.error to prevent error output in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Use a more reliable approach to catch the async error
    await expect(async () => {
      await act(async () => {
        screen.getByText('Login').click();
      });
    }).rejects.toThrow('Invalid credentials');
    
    // Restore console.error
    (console.error as jest.Mock).mockRestore();

    // The error is already caught and verified in the expect().rejects.toThrow() above
    expect(mockSetToken).not.toHaveBeenCalled();
  });

  test('login function throws EMAIL_NOT_VERIFIED error when API returns 403 with needsVerification', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: () => Promise.resolve({ needsVerification: true }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    try {
      await act(async () => {
        screen.getByText('Login').click();
      });
    } catch (error) {
      expect((error as Error).message).toBe('EMAIL_NOT_VERIFIED');
    }

    expect(mockSetToken).not.toHaveBeenCalled();
  });

  test('signup function calls API and sets token on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ access_token: 'test-token' }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Signup').click();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
          licenseKey: 'key123',
        }),
      })
    );
    expect(mockSetToken).toHaveBeenCalledWith('test-token');
  });

  test('signup function throws error when API returns error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Signup failed' }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    try {
      await act(async () => {
        screen.getByText('Signup').click();
      });
      // Si llegamos aquí, la prueba debería fallar porque esperamos que se lance un error
      fail('Expected an error to be thrown');
    } catch (error) {
      expect((error as Error).message).toBe('Signup failed');
    }

    expect(mockSetToken).not.toHaveBeenCalled();
  });

  test('logout function calls store logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Logout').click();
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  test('useEffect calls getToken on mount', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(mockGetToken).toHaveBeenCalled();
  });
});