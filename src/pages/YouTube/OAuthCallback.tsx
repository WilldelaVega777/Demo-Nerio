import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get the authorization code from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange the code for tokens
        const response = await axios.post(`${API_URL}/youtube-channels/oauth/token`, {
          code,
          redirectUri: `${window.location.origin}/oauth/callback`
        });

        if (response.data) {
          // Get the pending channel data from session storage
          const pendingChannel = sessionStorage.getItem('pendingYouTubeChannel');
          
          if (pendingChannel) {
            // Create the channel with the stored data
            await axios.post(`${API_URL}/youtube-channels`, JSON.parse(pendingChannel));
            sessionStorage.removeItem('pendingYouTubeChannel');
            message.success('Channel added successfully');
          }

          // Redirect back to the YouTube channels page
          navigate('/youtube-channels');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        message.error('Error during authentication');
        navigate('/youtube-channels');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl">Processing authentication...</h2>
      <p>Please wait while we complete the setup.</p>
    </div>
  );
};

export default OAuthCallback;