//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';
import PodcastOverview from '../pages/PodcastOverview';
import SentimentAnalysis from '../pages/SentimentAnalysis';
import AudienceInsights from '../pages/AudienceInsights';
import Sidebar from '../components/Sidebar';
import './ApplicationProvider.css';
import { AuthProvider } from './AuthProvider';
import Login from '../pages/Login';
import { useAuth } from './AuthProvider';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface ProtectedRouteProps {
  children: React.ReactNode;
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------
  const { isAuthenticated } = useAuth();

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
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const ApplicationProvider = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="app-container">
                  <Sidebar />
                  <Navbar />
                  <div className="content-container">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/overview" element={<PodcastOverview />} />
                      <Route path="/sentiment" element={<SentimentAnalysis />} />
                      <Route path="/audience" element={<AudienceInsights />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default ApplicationProvider;