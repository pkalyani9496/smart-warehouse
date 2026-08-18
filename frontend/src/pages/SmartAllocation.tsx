import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { orders, allocationStats, aiRecommendations, products, zoneWorkload } from '../data/warehouseData';

const SmartAllocation: React.FC = () => {
  const [appliedRec, setAppliedRec] = useState<string | null>(null);

  return (
    <div className="page-content">
      <div className="kpi-grid">
        <KPICard title="Waiting for Allocation" value={allocationStats.totalWaiting} icon="⏳" accent="amber" />
        <KPICard title="Auto Allocated" value={allocationStats.autoAllocated} icon="🤖" accent="green" />
        <KPICard title="Manual Required" value={allocationStats.manualRequired} icon="👤" accent="red" />
        <KPICard title="Allocation Efficiency" value={`${allocationStats.efficiency}%`} icon="📈" accent="purple" trend="0.8% vs yesterday" trendUp />
      </div>

      {/* AI Recommendation Cards */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🤖 AI Recommendations</h2>
          <span className="ai-badge">Powered by WarehouseAI</span>
        </div>
        <div className="ai-rec-grid">
          {aiRecommendations.map(rec => (
            <div key={rec.id} className="ai-rec-card">
              <div className="ai-rec-header">
                <span className="ai-rec-impact">
                  <StatusBadge status={rec.impact} variant={rec.impact === 'High' ? 'warning' : 'info'} />
                </span>
                <span className="ai-saving">💡 {rec.saving}</span>
              </div>
              <p className="ai-rec-text">{rec.text}</p>
              <button
                className={`btn ${appliedRec === rec.id ? 'btn-success' : 'btn-primary'}`}
                onClick={() => setAppliedRec(rec.id)}
              >
                {appliedRec === rec.id ? '✓ Applied' : 'Apply Recommendation'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Zone Overview */}
      <div className="two-col">
        <div className="card">
          <div className="card-header"><h2 className="card-title">Warehouse Zones</h2></div>
          <div className="zone-grid">
            {zoneWorkload.map(z => (
              <div key={z.zone} className={`zone-card ${z.utilization > 85 ? 'zone-overloaded' : ''}`}>
                <div className="zone-header">
                  <span className="zone-name">{z.zone}</span>
                  <span className={`zone-util ${z.utilization > 85 ? 'util-red' : z.utilization > 70 ? 'util-amber' : 'util-green'}`}>{z.utilization}%</span>
                </div>
                <div className="zone-stats">
                  <div><span className="zone-stat-label">Active Orders</span><span>{z.activeOrders}</span></div>
                  <div><span className="zone-stat-label">Pickers</span><span>{z.pickers}</span></div>
                  <div><span className="zone-stat-label">Avg Pick Time</span><span>{z.avgPickTime}</span></div>
                </div>
                <div className="progress-wrap" style={{ height: 6, marginTop: 10 }}>
                  <div className={`progress-fill ${z.utilization > 85 ? 'progress-red' : z.utilization > 70 ? 'progress-amber' : 'progress-green'}`} style={{ width: `${z.utilization}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Availability */}
        <div className="card">
          <div className="card-header"><h2 className="card-title">Available Inventory</h2></div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Product</th><th>Available</th><th>Reserved</th><th>Zone</th><th>Status</th></tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td className="text-center"><strong>{p.availableStock}</strong></td>
                    <td className="text-center text-muted">{p.reservedStock}</td>
                    <td><span className="zone-badge">Zone {p.zone}</span></td>
                    <td><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Allocation Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Allocation Queue</h2>
          <span className="card-badge">{orders.length} orders</span>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th><th>Product</th><th>Quantity</th><th>Zone</th>
                <th>Available Stock</th><th>Priority</th><th>Allocation Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => {
                const prod = products.find(p => p.sku === o.sku);
                return (
                  <tr key={o.id}>
                    <td><span className="order-id">#{o.id}</span></td>
                    <td>{o.product}</td>
                    <td className="text-center">{o.quantity}</td>
                    <td><span className="zone-badge">Zone {o.zone}</span></td>
                    <td className="text-center">{prod?.availableStock ?? '—'}</td>
                    <td>
                      <StatusBadge status={o.priority} variant={o.priority === 'Critical' ? 'danger' : o.priority === 'High' ? 'warning' : o.priority === 'Medium' ? 'info' : 'neutral'} />
                    </td>
                    <td><StatusBadge status={o.allocationStatus} /></td>
                    <td>
                      {o.allocationStatus === 'Manual Review' && (
                        <button className="btn btn-sm btn-primary">Allocate</button>
                      )}
                      {o.allocationStatus === 'Waiting' && (
                        <button className="btn btn-sm btn-secondary">Queue</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SmartAllocation;
