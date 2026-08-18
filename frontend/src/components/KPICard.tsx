import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  accent?: 'purple' | 'green' | 'amber' | 'red' | 'blue' | 'cyan';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon, trend, trendUp, accent = 'purple' }) => {
  return (
    <div className={`kpi-card kpi-${accent}`}>
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-body">
        <p className="kpi-title">{title}</p>
        <p className="kpi-value">{value}</p>
        {subtitle && <p className="kpi-subtitle">{subtitle}</p>}
        {trend && (
          <p className={`kpi-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
    </div>
  );
};

export default KPICard;
