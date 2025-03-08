import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import axios from 'axios';

interface YouTubeChannel {
  id: number;
  channelId: string;
  title: string;
  description: string;
  isActive: boolean;
}

const YouTubeChannels: React.FC = () => {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [form] = Form.useForm();
  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await axios.get(`${API_URL}/youtube-channels/tenant/1/active`);
      setChannels(response.data);
    } catch (error) {
      message.error('Error fetching channels');
    }
  };

  const handleAddChannel = async (values: any) => {
    try {
      // First, check if we have an active OAuth token
      const tokenResponse = await axios.get(`${API_URL}/youtube-channels/oauth/token/active`);
      
      if (!tokenResponse.data) {
        // No active token, initiate OAuth flow
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = `${window.location.origin}/oauth/callback`;
        const scope = 'https://www.googleapis.com/auth/youtube.readonly';
        
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
          client_id=${clientId}&
          redirect_uri=${redirectUri}&
          response_type=code&
          scope=${scope}&
          access_type=offline&
          prompt=consent`;
        
        // Store channel data in session storage to retrieve after OAuth
        sessionStorage.setItem('pendingYouTubeChannel', JSON.stringify(values));
        
        // Redirect to Google OAuth consent screen
        window.location.href = authUrl;
        return;
      }

      // If we have a token, proceed with channel creation
      await axios.post(`${API_URL}/youtube-channels`, values);
      message.success('Channel added successfully');
      form.resetFields();
      fetchChannels();
    } catch (error) {
      message.error('Error adding channel');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">YouTube Channels</h1>
      
      <Card className="mb-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddChannel}
        >
          <Form.Item
            label="Channel ID"
            name="channelId"
            rules={[{ required: true, message: 'Please input the channel ID!' }]}
          >
            <Input placeholder="Enter YouTube channel ID" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Channel
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map(channel => (
          <Card key={channel.id} title={channel.title}>
            <p>{channel.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YouTubeChannels;