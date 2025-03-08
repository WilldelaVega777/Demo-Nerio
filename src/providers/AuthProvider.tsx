//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
/// <reference types="vite/client" />
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import axios from 'axios';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface AuthContextType {
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: username,
        password,
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        setIsAuthenticated(true);
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
      const response = await axios.post(`${API_URL}/auth/signup`, data);
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
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