import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { episodeData } from '../data/episodeData';
import './PodcastOverview.css';

const PodcastOverview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTranscript = searchTerm
    ? episodeData.transcript.filter((entry) => entry.text.toLowerCase().includes(searchTerm.toLowerCase()))
    : episodeData.transcript;

  const retentionRateData = Object.entries(episodeData.metrics.retentionRate).map(([percentage, rate]) => ({
    percentage: parseFloat(percentage),
    rate: rate,
  }));

  const handleSpeakerClick = (chartTitle: string) => {
    // Placeholder function for speaker button action
    alert(`Speaker button clicked for ${chartTitle}`);
  };

  return (
    <div className="podcast-overview">
      <h1>{episodeData.title}</h1>
      <p>{episodeData.description}</p>

      <div className="section">
        <h2>Puntos Clave</h2>
        <ul>
          {episodeData.talkingPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Análisis de Sentimiento</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart width={500} height={200} data={Object.entries(episodeData.sentiment).map(([key, value]) => ({ name: key, value }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <div className="button-row">
            <button className="speaker-icon" onClick={() => handleSpeakerClick("Análisis de Sentimiento")}>🔊</button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Transcripción</h2>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar en la transcripción..." />
        <ul>
          {filteredTranscript.map((entry) => (
            <li key={entry.timestamp}>
              <span>{entry.timestamp}</span> {entry.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Análisis del Rendimiento del Invitado</h2>
        <table>
          <thead>
            <tr>
              <th>Invitado</th>
              <th>Tiempo de Habla</th>
              <th>Interacción</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(episodeData.guestPerformance).map(([guest, performance]) => (
              <tr key={guest}>
                <td>{guest}</td>
                <td>{performance.speakingTime}</td>
                <td>{performance.engagement}</td>
                <td>{performance.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Métricas de Rendimiento del Episodio</h2>
        <ul>
          <li>Reproducciones: {episodeData.metrics.plays}</li>
          <li>Tiempo medio de escucha: {episodeData.metrics.avgListeningTime}</li>
          <li>Tasa de retención de oyentes:</li>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={retentionRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="percentage" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
            <div className="button-row">
              <button className="speaker-icon" onClick={() => handleSpeakerClick("Tasa de retención de oyentes")}>🔊</button>
            </div>
          </div>
        </ul>
      </div>

      <div className="section">
        <h2>Interacción en Redes Sociales</h2>
        <ul>
          <li>Menciones: {episodeData.socialMedia.mentions}</li>
          <li>Sentimiento: {episodeData.socialMedia.sentiment}</li>
          <li>Hashtags: {episodeData.socialMedia.hashtags.join(', ')}</li>
        </ul>
      </div>
    </div>
  );
};

export default PodcastOverview;
