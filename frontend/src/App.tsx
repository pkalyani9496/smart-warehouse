import { useState } from 'react';
import Sidebar, { type Page } from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import SmartAllocation from './pages/SmartAllocation';
import PickingPacking from './pages/PickingPacking';
import Fulfillment from './pages/Fulfillment';
import Exceptions from './pages/Exceptions';
import Analytics from './pages/Analytics';
import WhatIfSimulator from './pages/WhatIfSimulator';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':   return <Dashboard />;
      case 'inventory':   return <Inventory />;
      case 'orders':      return <Orders />;
      case 'allocation':  return <SmartAllocation />;
      case 'picking':     return <PickingPacking />;
      case 'fulfillment': return <Fulfillment />;
      case 'exceptions':  return <Exceptions />;
      case 'analytics':   return <Analytics />;
      case 'simulator':   return <WhatIfSimulator />;
      case 'settings':    return <Settings />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="app-main">
        <Header currentPage={currentPage} />
        <main className="app-body">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
