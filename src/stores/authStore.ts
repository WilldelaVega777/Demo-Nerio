import { create } from 'zustand';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  username: string;
  exp: number;
  iat: number;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
  } | null;
  setToken: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
  refreshToken: () => Promise<string | null>;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  
  setToken: (token: string) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      set({
        token,
        isAuthenticated: true,
        user: {
          id: decoded.sub,
          username: decoded.username
        }
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ token: null, isAuthenticated: false, user: null });
  },
  
  getToken: () => {
    const { token } = get();
    if (!token) return null;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        // Token expirado, intentar renovarlo
        return null;
      }
      
      return token;
    } catch (error) {
      console.error('Error validating token:', error);
      return null;
    }
  },
  
  refreshToken: async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh-token`);
      if (response.data.access_token) {
        get().setToken(response.data.access_token);
        return response.data.access_token;
      }
      return null;
    } catch (error) {
      console.error('Error refreshing token:', error);
      get().logout();
      return null;
    }
  }
}));

// Inicializar el token desde localStorage al cargar la aplicación
const initializeAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp > currentTime) {
        // Token válido, configurar axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        // Token expirado, intentar renovarlo o eliminar
        useAuthStore.getState().refreshToken().catch(() => {
          useAuthStore.getState().logout();
        });
      }
    } catch (error) {
      // Token inválido, eliminar
      localStorage.removeItem('token');
    }
  }
};

// Configurar interceptor para manejar errores 401 (token expirado)
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 y no hemos intentado renovar el token antes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const token = await useAuthStore.getState().refreshToken();
        if (token) {
          // Reintentar la solicitud original con el nuevo token
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Inicializar autenticación
initializeAuth();