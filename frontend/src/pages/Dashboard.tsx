import React from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { kpiSummary, activityTimeline, orders, exceptions } from '../data/warehouseData';

const Dashboard: React.FC = () => {
  const openExceptions = exceptions.filter(e => !e.resolved);
  const criticalCount = openExceptions.filter(e => e.severity === 'Critical').length;

  return (
    <div className="page-content">
      {/* KPI Strip */}
      <div className="kpi-grid">
        <KPICard title="Total Orders Today" value={kpiSummary.ordersToday} icon="📋" accent="purple" trend="12% vs yesterday" trendUp />
        <KPICard title="Orders Processing" value={kpiSummary.ordersProcessing} icon="⚙️" accent="blue" />
        <KPICard title="Inventory Value" value={`₹${kpiSummary.inventoryValue.toLocaleString('en-IN')}`} icon="💰" accent="green" trend="3.2% vs last week" trendUp />
        <KPICard title="Fulfillment Rate" value={`${kpiSummary.fulfillmentRate}%`} icon="✅" accent="green" trend="1.2% vs yesterday" trendUp />
        <KPICard title="Warehouse Utilization" value={`${kpiSummary.warehouseUtilization}%`} icon="🏭" accent="amber" />
        <KPICard title="Active Pickers" value={kpiSummary.activePickers} icon="👷" accent="purple" />
      </div>

      <div className="dashboard-grid">
        {/* Live Operations */}
        <div className="card col-span-2">
          <div className="card-header">
            <h2 className="card-title">Live Operations</h2>
            <span className="status-dot status-live" style={{ alignSelf: 'center' }} />
          </div>
          <div className="ops-grid">
            {[
              { label: 'Orders Received',   value: kpiSummary.ordersToday,       icon: '📋', sub: 'Today' },
              { label: 'Being Picked',       value: 7,                             icon: '🔄', sub: 'In progress' },
              { label: 'In Packing',         value: 3,                             icon: '📦', sub: 'Stations active' },
              { label: 'Ready to Dispatch',  value: 5,                             icon: '🚚', sub: 'Awaiting courier' },
              { label: 'Delivered',          value: 68,                            icon: '✅', sub: 'Today' },
              { label: 'Active Exceptions',  value: criticalCount,                 icon: '⚠️', sub: 'Critical' },
            ].map((op) => (
              <div key={op.label} className="ops-card">
                <span className="ops-icon">{op.icon}</span>
                <span className="ops-value">{op.value}</span>
                <span className="ops-label">{op.label}</span>
                <span className="ops-sub">{op.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Activity Timeline</h2>
          </div>
          <div className="timeline">
            {activityTimeline.map((event, i) => (
              <div key={i} className={`timeline-item timeline-${event.type}`}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-time">{event.time}</span>
                  <p className="timeline-event">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card col-span-2">
          <div className="card-header">
            <h2 className="card-title">Recent Orders</h2>
            <span className="card-badge">{orders.length} orders</span>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th><th>Customer</th><th>Product</th><th>Status</th><th>Priority</th><th>Expected Dispatch</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map(o => (
                  <tr key={o.id}>
                    <td><span className="order-id">#{o.id}</span></td>
                    <td>{o.customer}</td>
                    <td>{o.product}</td>
                    <td><StatusBadge status={o.status} /></td>
                    <td><StatusBadge status={o.priority} variant={o.priority === 'Critical' ? 'danger' : o.priority === 'High' ? 'warning' : o.priority === 'Medium' ? 'info' : 'neutral'} /></td>
                    <td className="text-muted">{o.expectedDispatch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Critical Exceptions */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Critical Alerts</h2>
            <span className="card-badge badge-danger">{criticalCount} critical</span>
          </div>
          <div className="exception-list">
            {openExceptions.slice(0, 4).map(ex => (
              <div key={ex.id} className={`exception-mini exception-${ex.severity.toLowerCase()}`}>
                <div className="exception-mini-header">
                  <StatusBadge status={ex.severity} variant={ex.severity === 'Critical' ? 'danger' : ex.severity === 'High' ? 'warning' : 'info'} />
                  <span className="text-muted">{ex.detectedAt}</span>
                </div>
                <p className="exception-mini-title">{ex.title}</p>
                <p className="exception-mini-zone">{ex.zone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
