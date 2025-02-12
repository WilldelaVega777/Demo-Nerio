import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Navbar from './components/Navbar';
    import Dashboard from './pages/Dashboard';
    import PodcastOverview from './pages/PodcastOverview';
    import SentimentAnalysis from './pages/SentimentAnalysis';
    // ... other imports

    function App() {
      return (
        <BrowserRouter>
          <div className="app-container">
            <Navbar />
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/overview" element={<PodcastOverview />} />
                <Route path="/sentiment" element={<SentimentAnalysis />} /> {/* Check this route */}
                {/* ... other routes ... */}
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      );
    }

    export default App;
