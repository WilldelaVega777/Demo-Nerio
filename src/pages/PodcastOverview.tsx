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

      return (
        <div className="podcast-overview">
          <h1>{episodeData.title}</h1>
          <p>{episodeData.description}</p>

          <div className="section">
            <h2>Key Talking Points</h2>
            <ul>
              {episodeData.talkingPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>Sentiment Analysis</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart width={500} height={200} data={Object.entries(episodeData.sentiment).map(([key, value]) => ({ name: key, value }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="section">
            <h2>Searchable Transcript</h2>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search transcript..." />
            <ul>
              {filteredTranscript.map((entry) => (
                <li key={entry.timestamp}>
                  <span>{entry.timestamp}</span> {entry.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>Guest Performance Analysis</h2>
            <table>
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Speaking Time</th>
                  <th>Engagement</th>
                  <th>Feedback</th>
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
            <h2>Episode Performance Metrics</h2>
            <ul>
              <li>Plays: {episodeData.metrics.plays}</li>
              <li>Avg. Listening Time: {episodeData.metrics.avgListeningTime}</li>
              <li>Retention Rate:</li>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={retentionRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="percentage" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </ul>
          </div>

          <div className="section">
            <h2>Social Media Engagement</h2>
            <ul>
              <li>Mentions: {episodeData.socialMedia.mentions}</li>
              <li>Sentiment: {episodeData.socialMedia.sentiment}</li>
              <li>Hashtags: {episodeData.socialMedia.hashtags.join(', ')}</li>
            </ul>
          </div>
        </div>
      );
    };

    export default PodcastOverview;
