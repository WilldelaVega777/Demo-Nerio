//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './ApplicationProvider.css';
import { AuthProvider } from './AuthProvider';
import MainRoutes from '../routes/MainRoutes';
import { ConfigProvider, theme } from 'antd';

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const ApplicationProvider = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
        components: {
          Input: {
            colorBgContainer: '#2a2a2a',
            colorText: 'rgba(255, 255, 255, 0.85)',
            colorBorder: '#4a4a4a'
          },
          Card: {
            colorBgContainer: '#1f1f1f',
            colorTextHeading: 'rgba(255, 255, 255, 0.85)',
            colorText: 'rgba(255, 255, 255, 0.65)',
            colorBorderSecondary: '#303030'
          }
        }
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default ApplicationProvider;