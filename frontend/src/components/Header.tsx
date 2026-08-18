import React from 'react';
import type { Page } from './Sidebar';

const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  dashboard:   { title: 'Command Center',     subtitle: 'Real-time warehouse operations overview' },
  inventory:   { title: 'Inventory',          subtitle: 'Stock levels, zones, and product management' },
  orders:      { title: 'Orders',             subtitle: 'Order tracking and management' },
  allocation:  { title: 'Smart Allocation',   subtitle: 'AI-powered order-to-inventory allocation' },
  picking:     { title: 'Picking & Packing',  subtitle: 'Workflow management for pick and pack operations' },
  fulfillment: { title: 'Fulfillment',        subtitle: 'End-to-end order fulfillment lifecycle' },
  exceptions:  { title: 'Exceptions & Alerts',subtitle: 'Critical issues and bottleneck detection' },
  analytics:   { title: 'Analytics',          subtitle: 'Business intelligence and performance metrics' },
  simulator:   { title: 'What-If Simulator',  subtitle: 'AI-driven scenario planning and forecasting' },
  settings:    { title: 'Settings',           subtitle: 'Warehouse configuration and preferences' },
};

interface HeaderProps {
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const { title, subtitle } = pageTitles[currentPage];
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>
      <div className="header-right">
        <div className="header-live">
          <span className="status-dot status-live" />
          <span className="live-text">Live · {now}</span>
        </div>
        <button className="header-btn" aria-label="Notifications">
          <span>🔔</span>
          <span className="notif-badge">6</span>
        </button>
        <div className="header-avatar">KW</div>
      </div>
    </header>
  );
};

export default Header;
