//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend,
} from 'recharts';
import { overallSentiment } from '../../data/overallSentiment';
import { sentimentOverTime } from '../../data/sentimentOverTime';
import { sentimentByEpisode } from '../../data/sentimentByEpisode';
import { detailedSentiment } from '../../data/detailedSentiment';
import './SentimentAnalysis.css';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface SentimentAnalysisProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const COLORS = ['#00C49F', '#FF8042', '#FFBB28'];

  const handleSpeakerClick = (chartTitle: string) => {
    // Placeholder function for speaker button action
    alert(`Speaker button clicked for ${chartTitle}`);
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <div className="sentiment-analysis">
      <h1>Análisis de Sentimiento</h1>

      <div className="section">
        <h2>Sentimiento General</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart width={300} height={200}>
              <Pie
                data={[
                  { name: 'Positivo', value: overallSentiment.positive },
                  { name: 'Negativo', value: overallSentiment.negative },
                  { name: 'Neutral', value: overallSentiment.neutral },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                label
              >
                {COLORS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick('Sentimiento General')}>🔊</button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Sentimiento a lo largo del tiempo</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sentimentOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="episode" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="positive" stroke="#00C49F" />
              <Line type="monotone" dataKey="negative" stroke="#FF8042" />
              <Line type="monotone" dataKey="neutral" stroke="#FFBB28" />
            </LineChart>
          </ResponsiveContainer>
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick('Sentimiento a lo largo del tiempo')}>🔊</button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Sentimiento por Episodio</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentimentByEpisode}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="episode" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="positive" fill="#00C49F" />
              <Bar dataKey="negative" fill="#FF8042" />
              <Bar dataKey="neutral" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick('Sentimiento por Episodio')}>🔊</button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Desglose detallado</h2>
        <table>
          <thead>
            <tr>
              <th>Comentario</th>
              <th>Sentimiento</th>
            </tr>
          </thead>
          <tbody>
            {detailedSentiment.map((item) => (
              <tr key={item.comment}>
                <td>{item.comment}</td>
                <td>{item.sentiment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default SentimentAnalysis;