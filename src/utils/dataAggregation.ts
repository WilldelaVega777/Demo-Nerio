//--------------------------------------------------------------------------------------
// Data Aggregation Utilities
//--------------------------------------------------------------------------------------

interface EpisodeMetrics {
  plays: number;
  avgListeningTime: string;
  retentionRate: Record<string, number>;
}

interface Episode {
  metrics: EpisodeMetrics;
}

interface GuestPerformance {
  speakingTime: string;
  engagement: number;
  feedback: string;
}

/**
 * Aggregates time-based metrics for retention rate visualization
 */
export const aggregateRetentionData = (retentionData: Record<string, number>) => {
  return Object.entries(retentionData).map(([percentage, rate]) => ({
    percentage: parseFloat(percentage),
    rate,
  }));
};

/**
 * Aggregates sentiment analysis data for visualization
 */
export const aggregateSentimentData = (sentimentData: Record<string, number>) => {
  return Object.entries(sentimentData).map(([key, value]) => ({
    name: key,
    value,
  }));
};

/**
 * Calculates average metrics from episode data
 */
export const calculateAverageMetrics = (episodes: Episode[]) => {
  const totalEpisodes = episodes.length;
  if (totalEpisodes === 0) return null;

  return {
    avgPlays: episodes.reduce((sum, ep) => sum + ep.metrics.plays, 0) / totalEpisodes,
    avgRetention: episodes.reduce((sum, ep) => {
      const retentionValues = Object.values(ep.metrics.retentionRate);
      return sum + (retentionValues.reduce((a, b) => a + b, 0) / retentionValues.length);
    }, 0) / totalEpisodes,
    avgListeningTime: episodes.reduce((sum, ep) => {
      const time = parseFloat(ep.metrics.avgListeningTime.replace('min', ''));
      return sum + time;
    }, 0) / totalEpisodes,
  };
};

/**
 * Groups guest performance data by metrics
 */
export const aggregateGuestPerformance = (guestData: Record<string, GuestPerformance>) => {
  const metrics = {
    speakingTime: [] as Array<{ guest: string; value: number }>,
    engagement: [] as Array<{ guest: string; value: number }>,
    feedback: [] as Array<{ guest: string; text: string }>,
  };

  Object.entries(guestData).forEach(([guest, performance]) => {
    metrics.speakingTime.push({
      guest,
      value: parseFloat(performance.speakingTime.replace('min', '')),
    });
    metrics.engagement.push({
      guest,
      value: performance.engagement,
    });
    metrics.feedback.push({
      guest,
      text: performance.feedback,
    });
  });

  return metrics;
};

/**
 * Processes social media metrics for visualization
 */
export const aggregateSocialMetrics = (socialData: any) => {
  return {
    mentions: socialData.mentions,
    sentiment: socialData.sentiment,
    hashtags: socialData.hashtags,
    engagementRate: (socialData.mentions / socialData.totalFollowers) * 100,
  };
};