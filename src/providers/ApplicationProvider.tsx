//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';
import PodcastOverview from '../pages/PodcastOverview';
import SentimentAnalysis from '../pages/SentimentAnalysis';
import AudienceInsights from '../pages/AudienceInsights';
import Sidebar from '../components/Sidebar';
import './ApplicationProvider.css';

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface AppProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const ApplicationProvider: FC<AppProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------  
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <Navbar />
        <div className="content-container">
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
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default ApplicationProvider;