//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React, { useState, useEffect, FC } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, 
  Area, PieChart, Pie, Cell, ResponsiveContainer, ComposedChart
} from 'recharts';
import { playsPerEpisode } from '../../data/playsPerEpisode';
import { subscribersOverTime } from '../../data/subscribersOverTime';
import { audienceDemographics } from '../../data/audienceDemographics';
import { engagementMetrics } from '../../data/engagementMetrics';
import { socialMediaEngagement } from '../../data/socialMediaEngagement';
import { sentimentAnalysis } from '../../data/sentimentAnalysis';
import './Dashboard.css';
import { strings } from '../../providers/strings';
import ChartContainer from '../../components/ChartContainer';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface DashboardProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const Dashboard: React.FC<DashboardProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const handleSpeakerClick = (chartTitle: string) => {
    // Placeholder function for speaker button action
    alert(`Speaker button clicked for ${chartTitle}`);
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  const Dashboard: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Simulate data loading
      const loadData = async () => {
        setIsLoading(true);
        try {
          // Your data fetching logic here
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    }, []);
  
    return (
      <div className="dashboard">
        <div className="chart-grid">
          <ChartContainer 
            title={strings.dashboard.playsPerEpisode}
            isLoading={isLoading}
            onSpeakerClick={handleSpeakerClick}
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={playsPerEpisode}>
                {/* ... chart content ... */}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Repeat for other charts */}
        </div>
      </div>
    );
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <div className="dashboard">
      <div className="chart-grid">
        <div className="chart-container">
          <h3>{strings.dashboard.playsPerEpisode}</h3>
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
            <button className="speaker-icon" onClick={() => handleSpeakerClick(strings.dashboard.playsPerEpisode)}>
              {strings.common.speakerButton}
            </button>
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
            <button className="speaker-icon" onClick={() => handleSpeakerClick('Suscriptores con el tiempo')}>🔊</button>
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
            <button className="speaker-icon" onClick={() => handleSpeakerClick('Demografía de la audiencia')}>🔊</button>
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
            <button className="speaker-icon" onClick={() => handleSpeakerClick('Métricas de interacción')}>🔊</button>
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
            <button className="speaker-icon" onClick={() => handleSpeakerClick('Interacción en redes sociales')}>🔊</button>
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
            <button className="speaker-icon" onClick={() => handleSpeakerClick('Análisis de sentimiento')}>🔊</button>
          </div>
        </div>
      </div>
    </div>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default Dashboard;