import React, { useState } from 'react';

type Page =
  | 'dashboard'
  | 'inventory'
  | 'orders'
  | 'allocation'
  | 'picking'
  | 'fulfillment'
  | 'exceptions'
  | 'analytics'
  | 'simulator'
  | 'settings';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; icon: string; label: string }[] = [
  { id: 'dashboard',   icon: '🏠', label: 'Command Center' },
  { id: 'inventory',   icon: '📦', label: 'Inventory' },
  { id: 'orders',      icon: '🛒', label: 'Orders' },
  { id: 'allocation',  icon: '✨', label: 'Smart Allocation' },
  { id: 'picking',     icon: '🔄', label: 'Picking & Packing' },
  { id: 'fulfillment', icon: '🚚', label: 'Fulfillment' },
  { id: 'exceptions',  icon: '⚠️', label: 'Exceptions' },
  { id: 'analytics',   icon: '📊', label: 'Analytics' },
  { id: 'simulator',   icon: '🎛️', label: 'What-If Simulator' },
  { id: 'settings',    icon: '⚙️', label: 'Settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="sidebar-overlay"
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🏭</span>
            {!collapsed && (
              <div className="logo-text">
                <span className="logo-name">WarehouseAI</span>
                <span className="logo-sub">Operations Console</span>
              </div>
            )}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'nav-item-active' : ''}`}
              onClick={() => {
                onNavigate(item.id);
                // close on mobile
                if (window.innerWidth < 768) setCollapsed(true);
              }}
              title={collapsed ? item.label : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {!collapsed && currentPage === item.id && (
                <span className="nav-active-dot" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {!collapsed && (
            <div className="sidebar-status">
              <span className="status-dot status-live" />
              <span className="status-text">Live Operations</span>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        className="hamburger"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Open menu"
      >
        <span />
        <span />
        <span />
      </button>
    </>
  );
};

export default Sidebar;
export type { Page };
