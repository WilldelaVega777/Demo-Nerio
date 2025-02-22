//--------------------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------------------
import { FC, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { strings } from '../../providers/strings';
import "./Navbar.css";

//--------------------------------------------------------------------------------------
// Props Interface Section
//--------------------------------------------------------------------------------------
interface NavbarProps {
  // Define props here (if any)
}

//--------------------------------------------------------------------------------------
// Page Main Function Section
//--------------------------------------------------------------------------------------
const Navbar: FC<NavbarProps> = ({ /* props */ }) => {
  //--------------------------------------------------------------------------------------
  // Hooks Section
  //--------------------------------------------------------------------------------------
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  //--------------------------------------------------------------------------------------
  // Functions Section
  //--------------------------------------------------------------------------------------
  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  //--------------------------------------------------------------------------------------
  // JSX Section
  //--------------------------------------------------------------------------------------
  return (
    <nav className="top-nav">
      <ul>
        <li className={activeTab === '/'? 'active': ''}>
          <Link to="/" onClick={() => handleTabClick('/')}>{strings.navigation.dashboard}</Link>
        </li>
        <li className={activeTab === '/overview'? 'active': ''}>
          <Link to="/overview" onClick={() => handleTabClick('/overview')}>{strings.navigation.podcastOverview}</Link>
        </li>
        <li className={activeTab === '/sentiment'? 'active': ''}>
          <Link to="/sentiment" onClick={() => handleTabClick('/sentiment')}>{strings.navigation.sentimentAnalysis}</Link>
        </li>
        <li className={activeTab === '/audience'? 'active': ''}>
          <Link to="/audience" onClick={() => handleTabClick('/audience')}>{strings.navigation.audienceInsights}</Link>
        </li>
      </ul>
    </nav>
  );
};

//--------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------
export default Navbar;