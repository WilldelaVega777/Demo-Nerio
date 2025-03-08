import axios from 'axios';

interface AudienceDemographic {
  ageGroup: string;
  percentage: number;
}

interface SentimentData {
  episode: string;
  sentimentScore: number;
}

interface EngagementMetric {
  episode: string;
  avgListeningTime: string;
  retentionRate: number;
}

interface SubscriberData {
  date: string;
  subscribers: number;
}

interface SocialMediaMetrics {
  mentions: number;
  sentiment: number;
  hashtags: string[];
}

interface EpisodeMetrics {
  plays: number;
  avgListeningTime: string;
  retentionRate: Record<string, number>;
}

export class DashboardService {
  private readonly API_URL = 'http://localhost:3000';

  async getAudienceDemographics(): Promise<AudienceDemographic[]> {
    try {
      const response = await axios.get(`${this.API_URL}/analytics/demographics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching audience demographics:', error);
      return [];
    }
  }

  async getSentimentAnalysis(): Promise<SentimentData[]> {
    try {
      const response = await axios.get(`${this.API_URL}/analytics/sentiment`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sentiment analysis:', error);
      return [];
    }
  }

  async getEngagementMetrics(): Promise<EngagementMetric[]> {
    try {
      const response = await axios.get(`${this.API_URL}/analytics/engagement`);
      return response.data;
    } catch (error) {
      console.error('Error fetching engagement metrics:', error);
      return [];
    }
  }

  async getSubscribersOverTime(): Promise<SubscriberData[]> {
    try {
      const response = await axios.get(`${this.API_URL}/analytics/subscribers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscribers data:', error);
      return [];
    }
  }

  async getSocialMediaMetrics(): Promise<Record<string, SocialMediaMetrics>> {
    try {
      const response = await axios.get(`${this.API_URL}/analytics/social-media`);
      return response.data;
    } catch (error) {
      console.error('Error fetching social media metrics:', error);
      return {};
    }
  }

  async getEpisodeMetrics(episodeId: string): Promise<EpisodeMetrics | null> {
    try {
      const response = await axios.get(`${this.API_URL}/analytics/episodes/${episodeId}/metrics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching episode metrics:', error);
      return null;
    }
  }

  // Helper method to process and format data for charts
  processChartData<T>(data: T[]): T[] {
    // Add any common data processing logic here
    return data;
  }
}