//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import users from '../data/users.json';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

//--------------------------------------------------------------------------------------
// Variables Section
//--------------------------------------------------------------------------------------
const AuthContext = createContext<AuthContextType | null>(null);

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const login = (username: string, password: string) => {
    const user = users.users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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