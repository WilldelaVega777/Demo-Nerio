import { FC, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { strings } from '../../providers/strings';
import {
  ChartBarIcon,
  MicrophoneIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import './Sidebar.css';

interface SidebarProps {
  // Define props here (if any)
}

const Sidebar: FC<SidebarProps> = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItems = [
    { path: '/', icon: ChartBarIcon, text: strings.navigation.dashboard },
    { path: '/overview', icon: MicrophoneIcon, text: strings.navigation.podcastOverview },
    { path: '/sentiment', icon: ChatBubbleBottomCenterTextIcon, text: strings.navigation.sentimentAnalysis },
    { path: '/audience', icon: UserGroupIcon, text: strings.navigation.audienceInsights },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="collapse-btn"
        title={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            title={item.text}
          >
            <item.icon className="sidebar-icon" />
            {!isCollapsed && <span>{item.text}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;