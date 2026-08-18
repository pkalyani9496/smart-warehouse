import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import { orders } from '../data/warehouseData';

const Orders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const processing = orders.filter(o => o.status === 'Processing').length;
  const picking    = orders.filter(o => o.status === 'Picking').length;
  const packing    = orders.filter(o => o.status === 'Packing').length;
  const dispatched = orders.filter(o => o.status === 'Dispatched' || o.status === 'Delivered').length;
  const delayed    = orders.filter(o => o.status === 'Delayed').length;

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchSearch = o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statuses = ['All', 'Processing', 'Picking', 'Packing', 'Dispatched', 'Delivered', 'Delayed'];

  return (
    <div className="page-content">
      <div className="kpi-grid">
        <KPICard title="Total Orders" value={orders.length} icon="📋" accent="purple" />
        <KPICard title="Processing" value={processing} icon="⚙️" accent="blue" />
        <KPICard title="Picking" value={picking} icon="🔄" accent="purple" />
        <KPICard title="Packing" value={packing} icon="📦" accent="cyan" />
        <KPICard title="Dispatched / Delivered" value={dispatched} icon="✅" accent="green" />
        <KPICard title="Delayed" value={delayed} icon="⏰" accent="red" />
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Orders</h2>
          <div className="filters">
            <input
              className="search-input"
              placeholder="Search order or customer…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="tab-filters">
              {statuses.map(s => (
                <button
                  key={s}
                  className={`tab-btn ${statusFilter === s ? 'tab-btn-active' : ''}`}
                  onClick={() => setStatusFilter(s)}
                >{s}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th><th>Customer</th><th>Product</th><th>Qty</th><th>Value</th>
                <th>Zone</th><th>Priority</th><th>Pick Progress</th><th>Status</th><th>Expected Dispatch</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td><span className="order-id">#{o.id}</span></td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td className="text-center">{o.quantity}</td>
                  <td><strong>₹{o.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></td>
                  <td><span className="zone-badge">Zone {o.zone}</span></td>
                  <td>
                    <StatusBadge status={o.priority} variant={o.priority === 'Critical' ? 'danger' : o.priority === 'High' ? 'warning' : o.priority === 'Medium' ? 'info' : 'neutral'} />
                  </td>
                  <td style={{ minWidth: 140 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar value={o.pickProgress} showLabel={false} height={6} color={o.pickProgress === 100 ? 'green' : 'purple'} />
                      </div>
                      <span className="text-muted" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{o.fulfilledItems}/{o.itemCount}</span>
                    </div>
                  </td>
                  <td><StatusBadge status={o.status} /></td>
                  <td className="text-muted">{o.expectedDispatch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
