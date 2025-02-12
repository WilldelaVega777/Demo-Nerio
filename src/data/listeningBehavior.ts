export const listeningBehavior = {
      episodeCompletionRate: 0.75,
      listeningTimes: {
        Weekday: {
          Morning: 0.2,
          Afternoon: 0.3,
          Evening: 0.5,
        },
        Weekend: {
          Morning: 0.4,
          Afternoon: 0.4,
          Evening: 0.2,
        },
      },
      devices: {
        Smartphone: 0.7,
        Desktop: 0.2,
        Tablet: 0.05,
        "Smart Speaker": 0.05,
      },
      platforms: {
        Spotify: 0.4,
        "Apple Podcasts": 0.3,
        "Google Podcasts": 0.15,
        Website: 0.1,
        Other: 0.05,
      },
      topEpisodes: [
        { episode: "Episode 10: Interview with the Governor", plays: 10000 },
        { episode: "Episode 3: The Future of Yucatan", plays: 8000 },
        { episode: "Episode 5: Tech Startups in Merida", plays: 7000 },
      ],
    };
