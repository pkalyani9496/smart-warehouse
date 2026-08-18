import React from 'react';

interface ProgressBarProps {
  value: number; // 0–100
  color?: 'purple' | 'green' | 'amber' | 'red' | 'blue';
  showLabel?: boolean;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = 'purple', showLabel = true, height = 8 }) => {
  return (
    <div className="progress-wrap" style={{ height }}>
      <div
        className={`progress-fill progress-${color}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
      {showLabel && <span className="progress-label">{value}%</span>}
    </div>
  );
};

export default ProgressBar;
