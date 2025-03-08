import axios from 'axios';

interface ChannelAnalytics {
  totalViews: number;
  totalSubscribers: number;
  totalVideos: number;
  viewsPerDay: { date: string; views: number }[];
  subscribersPerDay: { date: string; subscribers: number }[];
  topVideos: {
    videoId: string;
    title: string;
    views: number;
    likes: number;
    comments: number;
  }[];
}

interface VideoPerformance {
  videoId: string;
  title: string;
  publishedAt: string;
  views: number;
  likes: number;
  comments: number;
  averageViewDuration: string;
  retentionRate: number;
}

export class YouTubeAnalyticsService {
  private readonly API_URL = 'http://localhost:3000';

  async getChannelAnalytics(channelId: string, days: number = 30): Promise<ChannelAnalytics> {
    try {
      const response = await axios.get(
        `${this.API_URL}/youtube-analytics/channel/${channelId}`,
        { params: { days } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching channel analytics:', error);
      throw error;
    }
  }

  async getVideoPerformance(videoId: string): Promise<VideoPerformance> {
    try {
      const response = await axios.get(
        `${this.API_URL}/youtube-analytics/video/${videoId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching video performance:', error);
      throw error;
    }
  }

  // Helper method to process data for charts
  processChartData<T extends { value: string | number }>(data: T[]): T[] {
    return data.map(item => ({
      ...item,
      value: typeof item.value === 'string' ? parseInt(item.value) : item.value
    }));
  }
}