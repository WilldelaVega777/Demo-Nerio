//--------------------------------------------------------------------------------------
// By: Will de la Vega (c) 2025
//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import ApplicationProvider from './providers/ApplicationProvider';
import 'antd/dist/reset.css';
import './index.css';

//--------------------------------------------------------------------------------------
// JSX Section
//--------------------------------------------------------------------------------------
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApplicationProvider />
  </React.StrictMode>,
);