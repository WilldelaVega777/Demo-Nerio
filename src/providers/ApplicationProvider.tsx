//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default ApplicationProvider;