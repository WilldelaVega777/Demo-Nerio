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
  const handleSpeakerClick = (chartTitle: string) => {
    // Placeholder function for speaker button action
    alert(`Speaker button clicked for ${chartTitle}`);
  };

  return (
    <div className="dashboard">
      <div className="chart-grid">
        {/* Plays per Episode */}
        <div className="chart-container">
          <h3>Reproducciones por Episodio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={playsPerEpisode} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="episode" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="plays" fill="#413ea0" />
            </BarChart>
          </ResponsiveContainer>
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick("Reproducciones por Episodio")}>🔊</button>
          </div>
        </div>

        {/* Subscribers Over Time */}
        <div className="chart-container">
          <h3>Suscriptores con el tiempo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={subscribersOverTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="subscribers" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick("Suscriptores con el tiempo")}>🔊</button>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="chart-container">
          <h3>Demografía de la audiencia</h3>
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
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick("Demografía de la audiencia")}>🔊</button>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="chart-container">
          <h3>Métricas de interacción</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={engagementMetrics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="episode" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgListeningTime" barSize={20} fill="#413ea0" stackId="a" />
              <Bar dataKey="retentionRate" barSize={20} fill="#ff7300" stackId="a" />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick("Métricas de interacción")}>🔊</button>
          </div>
        </div>

        {/* Social Media Engagement */}
        <div className="chart-container">
          <h3>Interacción en redes sociales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={socialMediaEngagement} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick("Interacción en redes sociales")}>🔊</button>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="chart-container">
          <h3>Análisis de sentimiento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sentimentAnalysis} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="episode" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sentimentScore" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick("Análisis de sentimiento")}>🔊</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
