import React from 'react';
    import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from 'recharts';
    import { demographics } from '../data/demographics';
    import { listeningBehavior } from '../data/listeningBehavior';
    import { engagement } from '../data/engagement';
    import './AudienceInsights.css';

    const AudienceInsights: React.FC = () => {
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

      return (
        <div className="audience-insights">
          <h1>Audience Insights</h1>

          <div className="section">
            <h2>Demographic Breakdown</h2>
            <div className="chart-grid">
              <div className="chart-item">
                <h3>Age Distribution</h3>
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
                <h3>Gender Distribution</h3>
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
                <h3>Location Distribution</h3>
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
            <h2>Listening Behavior</h2>
            <div className="chart-grid">
              <div className="chart-item">
                <h3>Listening Times</h3>
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
                <h3>Device Usage</h3>
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
                <h3>Platform Usage</h3>
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
            <h2>Engagement Analysis</h2>
            <div className="chart-grid">
              <div className="chart-item">
                <h3>Social Media Engagement</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={Object.entries(engagement.socialMedia).map(([key, value]) => ({ name: key, value }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="mentions" fill="#8884d8" />
                    <Bar dataKey="sentiment" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-item">
                <h3>Website Traffic</h3>
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
