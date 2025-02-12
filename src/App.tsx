import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Navbar from './components/Navbar';
    import Dashboard from './pages/Dashboard';
    import PodcastOverview from './pages/PodcastOverview';
    import SentimentAnalysis from './pages/SentimentAnalysis';
    import AudienceInsights from './pages/AudienceInsights';
    import './app.css';

    function App() {
      return (
        <BrowserRouter>
          <div className="app-container">
            <Navbar />
            <div className="content-container"> {/* Content container */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/overview" element={<PodcastOverview />} />
                <Route path="/sentiment" element={<SentimentAnalysis />} />
                <Route path="/audience" element={<AudienceInsights />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      );
    }

    export default App;
