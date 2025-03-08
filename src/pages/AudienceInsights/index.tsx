//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, 
  YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, ComposedChart
} from 'recharts';
import { demographics } from '../../data/demographics';
import { listeningBehavior } from '../../data/listeningBehavior';
import { engagement } from '../../data/engagement';
import { aggregateSocialMetrics } from '../../utils/dataAggregation';
import './AudienceInsights.css';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface AudienceInsightsProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const AudienceInsights: React.FC<AudienceInsightsProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8042', '#8884d8'];

  const handleSpeakerClick = (chartTitle: string) => {
    alert(`Speaker button clicked for ${chartTitle}`);
  };

  // Process data using aggregation utilities
  const demographicsData = {
    age: Object.entries(demographics.age).map(([key, value]) => ({ name: key, value })),
    gender: Object.entries(demographics.gender).map(([key, value]) => ({ name: key, value })),
    location: Object.entries(demographics.location).map(([key, value]) => ({ name: key, value }))
  };

  const listeningData = {
    times: Object.entries(listeningBehavior.listeningTimes).map(([key, value]) => ({ name: key, value })),
    devices: Object.entries(listeningBehavior.devices).map(([key, value]) => ({ name: key, value })),
    platforms: Object.entries(listeningBehavior.platforms).map(([key, value]) => ({ name: key, value }))
  };

  const socialMetrics = aggregateSocialMetrics(engagement.socialMedia);
  const websiteTraffic = Object.entries(engagement.website.pageViews).map(([key, value]) => ({ name: key, value }));

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <div className="audience-insights">
      <h1>Información de la Audiencia</h1>

      <div className="section">
        <h2>Desglose Demográfico</h2>
        <div className="chart-grid">
          <div className="chart-item">
            <h3>Distribución por Edad</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={demographicsData.age}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="button-row">
                <button className="speaker-icon" onClick={() => handleSpeakerClick('Distribución por Edad')}>🔊</button>
              </div>
            </div>
          </div>
          <div className="chart-item">
            <h3>Distribución por Género</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={demographicsData.gender}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="button-row">
                <button className="speaker-icon" onClick={() => handleSpeakerClick('Distribución por Género')}>🔊</button>
              </div>
            </div>
          </div>
          <div className="chart-item">
            <h3>Distribución por Ubicación</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={demographicsData.location}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div className="button-row">
                <button className="speaker-icon" onClick={() => handleSpeakerClick('Distribución por Ubicación')}>🔊</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Comportamiento de Escucha</h2>
        <div className="chart-grid">
          <div className="chart-item">
            <h3>Horarios de Escucha</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={listeningData.times}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div className="button-row">
                <button className="speaker-icon" onClick={() => handleSpeakerClick('Horarios de Escucha')}>🔊</button>
              </div>
            </div>
          </div>
          <div className="chart-item">
            <h3>Uso de Dispositivos</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={listeningData.devices}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="button-row">
                <button className="speaker-icon" onClick={() => handleSpeakerClick('Uso de Dispositivos')}>🔊</button>
              </div>
            </div>
          </div>
          <div className="chart-item">
            <h3>Uso de Plataformas</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={listeningData.platforms}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div className="button-row">
                <button className="speaker-icon" onClick={() => handleSpeakerClick('Uso de Plataformas')}>🔊</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Análisis de Interacción</h2>
        <div className="chart-grid">
          <div className="chart-item">
            <h3>Interacción en Redes Sociales</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={[socialMetrics]}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="mentions" barSize={20} fill="#413ea0" />
                  <Line type="monotone" dataKey="sentiment" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="button-row">
                <button className="speaker-icon" onClick={() => handleSpeakerClick('Interacción en Redes Sociales')}>🔊</button>
              </div>
            </div>
          </div>
          <div className="chart-item">
            <h3>Tráfico del Sitio Web</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={websiteTraffic}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              <div className="button-row">
                <button className="speaker-icon" onClick={() => handleSpeakerClick('Tráfico del Sitio Web')}>🔊</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default AudienceInsights;