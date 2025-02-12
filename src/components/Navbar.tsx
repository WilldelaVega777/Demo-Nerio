import { useState } from 'react';
    import { useLocation, Link } from 'react-router-dom';
    import './Navbar.css';

    const Navbar = () => {
      const location = useLocation();
      const [activeTab, setActiveTab] = useState(location.pathname);

      const handleTabClick = (path: string) => {
        setActiveTab(path);
      };

      return (
        <nav>
          <ul>
            <li className={activeTab === '/' ? 'active' : ''}>
              <Link to="/" onClick={() => handleTabClick('/')}>Dashboard</Link>
            </li>
            <li className={activeTab === '/overview' ? 'active' : ''}>
              <Link to="/overview" onClick={() => handleTabClick('/overview')}>Podcast Overview</Link>
            </li>
            <li className={activeTab === '/sentiment' ? 'active' : ''}>
              <Link to="/sentiment" onClick={() => handleTabClick('/sentiment')}>Sentiment Analysis</Link>
            </li>
            <li className={activeTab === '/audience' ? 'active' : ''}>
              <Link to="/audience" onClick={() => handleTabClick('/audience')}>Audience Insights</Link>
            </li>
          </ul>
        </nav>
      );
    };

    export default Navbar;
