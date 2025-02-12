import React from 'react';
    import {
      PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, ComposedChart,
    } from 'recharts';
    import { demographics } from '../data/demographics';
    import { listeningBehavior } from '../data/listeningBehavior';
    import { engagement } from '../data/engagement';
    import './AudienceInsights.css';

    const AudienceInsights: React.FC = () => {
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8042', '#8884d8'];

      return (
        <div className="audience-insights">
          <h1>Información de la Audiencia</h1>

          <div className="section">
            <h2>Desglose Demográfico</h2>
            <div className="chart-grid">
              <div className="chart-item">
                <h3>Distribución por Edad</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={Object.entries(demographics.age).map(([key, value]) => ({ name: key, value }))}
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
              </div>
              <div className="chart-item">
                <h3>Distribución por Género</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={Object.entries(demographics.gender).map(([key, value]) => ({ name: key, value }))}
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
              </div>
              <div className="chart-item">
                <h3>Distribución por Ubicación</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={Object.entries(demographics.location).map(([key, value]) => ({ name: key, value }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Comportamiento de Escucha</h2>
            <div className="chart-grid">
              <div className="chart-item">
                <h3>Horarios de Escucha</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={Object.entries(listeningBehavior.listeningTimes).map(([key, value]) => ({ name: key, value }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-item">
                <h3>Uso de Dispositivos</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={Object.entries(listeningBehavior.devices).map(([key, value]) => ({ name: key, value }))}
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
              </div>
              <div className="chart-item">
                <h3>Uso de Plataformas</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={Object.entries(listeningBehavior.platforms).map(([key, value]) => ({ name: key, value }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Análisis de Interacción</h2>
            <div className="chart-grid">
              <div className="chart-item">
                <h3>Interacción en Redes Sociales</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={Object.entries(engagement.socialMedia).map(([key, value]) => ({ name: key, ...value }))}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mentions" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="sentiment" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-item">
                <h3>Tráfico del Sitio Web</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={Object.entries(engagement.website.pageViews).map(([key, value]) => ({ name: key, value }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default AudienceInsights;
