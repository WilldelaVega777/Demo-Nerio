//--------------------------------------------------------------------------------------
// By: Will de la Vega (c) 2025
//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import ApplicationProvider from './providers/ApplicationProvider';
// Ant Design v5 uses CSS-in-JS by default, no need to import CSS file
import './index.css';

//--------------------------------------------------------------------------------------
// JSX Section
//--------------------------------------------------------------------------------------
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApplicationProvider />
  </React.StrictMode>,
);