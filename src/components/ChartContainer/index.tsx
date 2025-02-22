import { FC, ReactNode } from 'react';
import './ChartContainer.css';

interface ChartContainerProps {
  title: string;
  isLoading?: boolean;
  children: ReactNode;
  onSpeakerClick?: (title: string) => void;
}

const ChartContainer: FC<ChartContainerProps> = ({ 
  title, 
  isLoading = false, 
  children, 
  onSpeakerClick 
}) => {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <div className="chart-content">
        {isLoading ? (
          <div className="chart-loader">
            <div className="loader"></div>
          </div>
        ) : children}
      </div>
      {onSpeakerClick && (
        <div className="button-row">
          <button 
            className="speaker-icon" 
            onClick={() => onSpeakerClick(title)}
          >
            🔊
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartContainer;