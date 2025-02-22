//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, 
  PieChart, Pie, Cell,
} from 'recharts';
import { episodeData } from '../../data/episodeData';
import './PodcastOverview.css';
import { strings } from '../../providers/strings';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface PodcastOverviewProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const PodcastOverview: React.FC<PodcastOverviewProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState('');

  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const filteredTranscript = searchTerm
  ? episodeData.transcript.filter((entry) => entry.text.toLowerCase().includes(searchTerm.toLowerCase()))
  : episodeData.transcript;

  const retentionRateData = Object.entries(episodeData.metrics.retentionRate).map(([percentage, rate]) => ({
    percentage: parseFloat(percentage),
    rate,
  }));

  const handleSpeakerClick = (chartTitle: string) => {
    // Placeholder function for speaker button action
    alert(`Speaker button clicked for ${chartTitle}`);
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <div className="podcast-overview">
      <h1>{episodeData.title}</h1>
      <p>{episodeData.description}</p>

      <div className="section">
        <h2>{strings.podcastOverview.sections.keyPoints}</h2>
        <ul>
          {episodeData.talkingPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>{strings.podcastOverview.sections.sentimentAnalysis}</h2>
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
            <button className="speaker-icon" onClick={() => handleSpeakerClick(strings.podcastOverview.sections.sentimentAnalysis)}>
              {strings.common.speakerButton}
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>{strings.podcastOverview.sections.transcript}</h2>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder={strings.podcastOverview.search.placeholder} 
        />
        <ul>
          {filteredTranscript.map((entry) => (
            <li key={entry.timestamp}>
              <span>{entry.timestamp}</span> {entry.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>{strings.podcastOverview.sections.guestPerformance}</h2>
        <table>
          <thead>
            <tr>
              <th>{strings.podcastOverview.table.guest}</th>
              <th>{strings.podcastOverview.table.speakingTime}</th>
              <th>{strings.podcastOverview.table.interaction}</th>
              <th>{strings.podcastOverview.table.comments}</th>
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
        <h2>{strings.podcastOverview.sections.episodeMetrics}</h2>
        <ul>
          <li>{strings.podcastOverview.metrics.plays}: {episodeData.metrics.plays}</li>
          <li>{strings.podcastOverview.metrics.avgListeningTime}: {episodeData.metrics.avgListeningTime}</li>
          <li>{strings.podcastOverview.metrics.retentionRate}:</li>
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
              <button className="speaker-icon" onClick={() => handleSpeakerClick(strings.podcastOverview.metrics.retentionRate)}>
                {strings.common.speakerButton}
              </button>
            </div>
          </div>
        </ul>
      </div>

      <div className="section">
        <h2>{strings.podcastOverview.sections.socialMedia}</h2>
        <ul>
          <li>{strings.podcastOverview.social.mentions}: {episodeData.socialMedia.mentions}</li>
          <li>{strings.podcastOverview.social.sentiment}: {episodeData.socialMedia.sentiment}</li>
          <li>{strings.podcastOverview.social.hashtags}: {episodeData.socialMedia.hashtags.join(', ')}</li>
        </ul>
      </div>
    </div>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default PodcastOverview;