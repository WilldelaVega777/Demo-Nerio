# Nerio Torres Podcast Analytics Dashboard

This project is a web application built with React and TypeScript using Vite. It provides a comprehensive analytics dashboard for Nerio Torres' podcast, offering insights into listener demographics, engagement, sentiment, and more.

## Features

* **Dashboard:**
    * Displays key podcast metrics such as total downloads, subscribers, and average plays per episode.
    * Visualizes data using interactive charts and graphs (using Recharts).
    * Provides a clear overview of podcast performance trends.

* **Podcast Overview:**
    * Shows detailed information about the latest episode, including key talking points, sentiment analysis, and a searchable transcript.
    * Analyzes guest performance, providing insights into speaking time, engagement, and audience feedback.
    * Tracks episode-specific metrics like plays, average listening time, and listener retention rate.

* **Sentiment Analysis:**
    * Analyzes listener sentiment towards the podcast and its episodes.
    * Displays overall sentiment scores and trends over time.
    * Provides a detailed breakdown of sentiment by episode, speaker, or topic.

* **Audience Insights:**
    * Provides a comprehensive view of listener demographics, including age, gender, location, and interests.
    * Analyzes listening behavior, such as episode completion rate, listening times, and preferred devices and platforms.
    * Tracks engagement metrics, including social media interactions, website traffic, and feedback from surveys and reviews.

## Technologies Used

* **React:** JavaScript library for building user interfaces.
* **TypeScript:** Typed superset of JavaScript for improved code quality and maintainability.
* **Vite:** Build tool for fast and efficient development.
* **Recharts:** Charting library for React.
* **(Add any other libraries or tools used)**

## Installation

1. Clone the repository: `git clone https://github.com/your-username/nerio-ai-dashboard.git`
2. Install dependencies: `npm install`

## Running the Application

1. Start the development server: `npm run dev`
2. Open the application in your browser: `http://localhost:5173/` (or the port specified by Vite)

## Project Structure

nerio-ai-dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.module.css
│   │   ├──...
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.module.css
│   │   ├── PodcastOverview/
│   │   │   ├── PodcastOverview.tsx
│   │   │   └── PodcastOverview.module.css
│   │   ├── SentimentAnalysis/
│   │   │   ├── SentimentAnalysis.tsx
│   │   │   └── SentimentAnalysis.module.css
│   │   ├── AudienceInsights/
│   │   │   ├── AudienceInsights.tsx
│   │   │   └── AudienceInsights.module.css
│   ├── data/
│   │   ├── demographics.json
│   │   ├── listeningBehavior.json
│   │   ├── engagement.json
│   │   ├──...
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite.config.ts
├── package.json
└──...