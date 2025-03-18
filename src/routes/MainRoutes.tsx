//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import PodcastOverview from '../pages/PodcastOverview';
import SentimentAnalysis from '../pages/SentimentAnalysis';
import AudienceInsights from '../pages/AudienceInsights';
import UserSettings from '../pages/UserSettings';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
import { useAuth } from '../providers/AuthProvider';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface ProtectedRouteProps {
  children: React.ReactNode;
}

//--------------------------------------------------------------------------------------
// Component Section
//--------------------------------------------------------------------------------------
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

//--------------------------------------------------------------------------------------
// Main Component Section
//--------------------------------------------------------------------------------------
const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
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
                  <Route path="/settings" element={<UserSettings />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default MainRoutes;