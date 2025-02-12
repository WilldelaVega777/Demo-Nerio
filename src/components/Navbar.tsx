import { useState } from 'react';
import "./Navbar.css"
    import { useLocation, Link } from 'react-router-dom';

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
              <Link to="/" onClick={() => handleTabClick('/')}>Panel</Link>
            </li>
            <li className={activeTab === '/overview' ? 'active' : ''}>
              <Link to="/overview" onClick={() => handleTabClick('/overview')}>Visión General del podcast</Link>
            </li>
            <li className={activeTab === '/sentiment' ? 'active' : ''}>
              <Link to="/sentiment" onClick={() => handleTabClick('/sentiment')}>Análisis de sentimiento</Link>
            </li>
            <li className={activeTab === '/audience' ? 'active' : ''}>
              <Link to="/audience" onClick={() => handleTabClick('/audience')}>Información de la audiencia</Link>
            </li>
          </ul>
        </nav>
      );
    };

    export default Navbar;
