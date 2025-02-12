import React from 'react';
    import {
      BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, ComposedChart,
    } from 'recharts';
    import { playsPerEpisode } from '../data/playsPerEpisode';
    import { subscribersOverTime } from '../data/subscribersOverTime';
    import { audienceDemographics } from '../data/audienceDemographics';
    import { engagementMetrics } from '../data/engagementMetrics';
    import { socialMediaEngagement } from '../data/socialMediaEngagement';
    import { sentimentAnalysis } from '../data/sentimentAnalysis';
    import './Dashboard.css';

    const Dashboard: React.FC = () => {
      return (
        <div className="dashboard">
          <div className="chart-grid">
            {/* Plays per Episode */}
            <div className="chart-container">
              <h2>Plays per Episode</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={playsPerEpisode}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="episode" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="plays" fill="#413ea0" />
                </BarChart>
              </ResponsiveContainer>
              <span className="speaker-icon">🔊</span>
            </div>

            {/* Subscribers Over Time */}
            <div className="chart-container">
              <h2>Subscribers Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={subscribersOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="subscribers" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
              <span className="speaker-icon">🔊</span>
            </div>

            {/* Audience Demographics */}
            <div className="chart-container">
              <h2>Audience Demographics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={audienceDemographics}
                    dataKey="percentage"
                    nameKey="ageGroup"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {audienceDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${(index * 100000 + 500000).toString(16).slice(0, 6)}`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <span className="speaker-icon">🔊</span>
            </div>

            {/* Engagement Metrics */}
            <div className="chart-container">
              <h2>Engagement Metrics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={engagementMetrics}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="episode" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgListeningTime" barSize={20} fill="#413ea0" stackId="a" />
                  <Bar dataKey="retentionRate" barSize={20} fill="#ff7300" stackId="a" />
                </ComposedChart>
              </ResponsiveContainer>
              <span className="speaker-icon">🔊</span>
            </div>

            {/* Social Media Engagement */}
            <div className="chart-container">
              <h2>Social Media Engagement</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={socialMediaEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" />
                  <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="shares" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
              <span className="speaker-icon">🔊</span>
            </div>

            {/* Sentiment Analysis */}
            <div className="chart-container">
              <h2>Sentiment Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sentimentAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="episode" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sentimentScore" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
              <span className="speaker-icon">🔊</span>
            </div>
          </div>
        </div>
      );
    };

    export default Dashboard;
