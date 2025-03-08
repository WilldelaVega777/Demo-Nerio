//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './ApplicationProvider.css';
import { AuthProvider } from './AuthProvider';
import MainRoutes from '../routes/MainRoutes';

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const ApplicationProvider = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Sidebar />
          <Navbar />
          <MainRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default ApplicationProvider;