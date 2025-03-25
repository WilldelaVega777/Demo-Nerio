//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
/// <reference types="vite/client" />
import { createContext, useContext, useEffect, ReactNode, FC } from 'react';
import { useAuthStore } from '../stores/authStore';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (data: { email: string; password: string; licenseKey: string }) => Promise<boolean>;
}

interface AuthProviderProps {
  children: ReactNode;
}

//--------------------------------------------------------------------------------------
// Variables Section
//--------------------------------------------------------------------------------------
const AuthContext = createContext<AuthContextType | null>(null);
const API_URL = import.meta.env.VITE_API_URL;

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------
  const { isAuthenticated, user, setToken, logout: storeLogout, getToken } = useAuthStore();

  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Verificar si el error es debido a que el correo no está verificado
        if (response.status === 403 && data.needsVerification) {
          const error = new Error('EMAIL_NOT_VERIFIED');
          // Añadir el email como propiedad al error para poder redirigir al usuario
          // a la página de verificación de correo
          (error as any).email = username;
          throw error;
        }
        throw new Error(data.message || 'Login failed');
      }

      if (data.access_token) {
        setToken(data.access_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (data: { email: string; password: string; licenseKey: string }) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const responseData = await response.json();
      if (responseData.access_token) {
        setToken(responseData.access_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    storeLogout();
  };

  // Verificar token al montar el componente
  useEffect(() => {
    getToken();
  }, []);

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
export const useAuth = () => {
  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------
  const context = useContext(AuthContext);

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};