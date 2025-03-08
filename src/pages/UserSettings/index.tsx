//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import './UserSettings.css';

//--------------------------------------------------------------------------------------
// Interfaces Section
//--------------------------------------------------------------------------------------
interface YouTubeChannel {
  id: string;
  channelUrl: string;
  lastExtraction: Date | null;
}

interface UserSettingsProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const UserSettings: React.FC<UserSettingsProps> = () => {
  //--------------------------------------------------------------------------------------
  // State Section
  //--------------------------------------------------------------------------------------
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [newChannelUrl, setNewChannelUrl] = useState('');
  const [extractionFrequency, setExtractionFrequency] = useState(3); // Default 3 days
  const [extractionSettings, setExtractionSettings] = useState<{ extractionFrequencyDays: number, lastExtractionDate: Date | null }>({ extractionFrequencyDays: 3, lastExtractionDate: null });

  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChannelUrl) {
      const newChannel: YouTubeChannel = {
        id: Date.now().toString(),
        channelUrl: newChannelUrl,
        lastExtraction: null
      };
      setChannels([...channels, newChannel]);
      setNewChannelUrl('');
    }
  };

  const handleRemoveChannel = (id: string) => {
    setChannels(channels.filter(channel => channel.id !== id));
  };

  const handleManualExtraction = async () => {
    // TODO: Implement API call to trigger manual data extraction
    alert('Manual extraction triggered');
  };

  useEffect(() => {
    // Fetch extraction settings when component mounts
    const fetchExtractionSettings = async () => {
      try {
        const response = await fetch('/api/youtube-extraction-settings');
        if (response.ok) {
          const data = await response.json();
          setExtractionSettings(data);
          setExtractionFrequency(data.extractionFrequencyDays);
        }
      } catch (error) {
        console.error('Error fetching extraction settings:', error);
      }
    };
  
    fetchExtractionSettings();
  }, []);

  const handleFrequencyChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setExtractionFrequency(value);
      try {
        const response = await fetch('/api/youtube-extraction-settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ extractionFrequencyDays: value }),
        });
        if (response.ok) {
          const data = await response.json();
          setExtractionSettings(data);
        }
      } catch (error) {
        console.error('Error updating extraction settings:', error);
      }
    }
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <div className="user-settings">
      <h1>User Settings</h1>

      <section className="youtube-channels-section">
        <h2>YouTube Channels</h2>
        
        <form onSubmit={handleAddChannel} className="add-channel-form">
          <input
            type="text"
            value={newChannelUrl}
            onChange={(e) => setNewChannelUrl(e.target.value)}
            placeholder="Enter YouTube channel URL"
            required
          />
          <button type="submit">Add Channel</button>
        </form>

        <div className="channels-list">
          {channels.map(channel => (
            <div key={channel.id} className="channel-item">
              <span>{channel.channelUrl}</span>
              <span className="last-extraction">
                {channel.lastExtraction 
                  ? `Last extraction: ${channel.lastExtraction.toLocaleDateString()}`
                  : 'No extraction yet'}
              </span>
              <button 
                onClick={() => handleRemoveChannel(channel.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="extraction-settings-section">
        <h2>Data Extraction Settings</h2>
        
        <div className="extraction-controls">
          <div className="frequency-control">
            <label htmlFor="extractionFrequency">Extract data every</label>
            <input
              type="number"
              id="extractionFrequency"
              value={extractionFrequency}
              onChange={handleFrequencyChange}
              min="1"
            />
            <span>days</span>
          </div>

          <button 
            onClick={handleManualExtraction}
            className="manual-extraction-button"
          >
            Extract Data Now
          </button>
        </div>
      </section>
    </div>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default UserSettings;