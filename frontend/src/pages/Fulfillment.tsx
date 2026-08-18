import React from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { orders, kpiSummary, fulfillmentTrend } from '../data/warehouseData';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const stages = ['Order', 'Allocation', 'Picking', 'Packing', 'Dispatch', 'Delivered'];

const Fulfillment: React.FC = () => {
  const pending   = orders.filter(o => ['Processing', 'Picking', 'Packing'].includes(o.status)).length;
  const delayed   = orders.filter(o => o.status === 'Delayed').length;

  const stageCount = (stage: string) => {
    const map: Record<string, string[]> = {
      'Order':     ['Processing'],
      'Allocation':['Processing'],
      'Picking':   ['Picking'],
      'Packing':   ['Packing'],
      'Dispatch':  ['Dispatched'],
      'Delivered': ['Delivered'],
    };
    return orders.filter(o => (map[stage] || []).includes(o.status)).length;
  };

  return (
    <div className="page-content">
      <div className="kpi-grid">
        <KPICard title="Today's Orders" value={kpiSummary.ordersToday} icon="📋" accent="purple" />
        <KPICard title="Fulfilled Orders" value={kpiSummary.fulfilledToday} icon="✅" accent="green" />
        <KPICard title="Pending Orders" value={pending} icon="⏳" accent="amber" />
        <KPICard title="Delayed Orders" value={delayed} icon="⏰" accent="red" />
        <KPICard title="Fulfillment Rate" value={`${kpiSummary.fulfillmentRate}%`} icon="📈" accent="green" trend="1.2% vs yesterday" trendUp />
        <KPICard title="Avg Fulfillment Time" value={kpiSummary.avgFulfillmentTime} icon="⏱️" accent="blue" />
      </div>

      {/* Lifecycle Pipeline */}
      <div className="card">
        <div className="card-header"><h2 className="card-title">Order Fulfillment Pipeline</h2></div>
        <div className="pipeline">
          {stages.map((stage, i) => (
            <React.Fragment key={stage}>
              <div className="pipeline-stage">
                <div className="pipeline-count">{stageCount(stage)}</div>
                <div className="pipeline-label">{stage}</div>
              </div>
              {i < stages.length - 1 && <div className="pipeline-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <div className="card-header"><h2 className="card-title">Fulfillment Performance (Today)</h2></div>
        <div style={{ padding: '0 20px 24px' }}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={fulfillmentTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} dot={false} name="Orders Received" />
              <Line type="monotone" dataKey="fulfilled" stroke="#10b981" strokeWidth={2} dot={false} name="Fulfilled" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fulfillment Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Order Fulfillment Status</h2>
          <span className="card-badge">{orders.length} orders</span>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th><th>Customer</th><th>Items</th><th>Current Stage</th>
                <th>Expected Dispatch</th><th>Value</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => {
                const stageMap: Record<string, string> = {
                  'Processing': 'Allocation',
                  'Picking':    'Picking',
                  'Packing':    'Packing',
                  'Dispatched': 'Dispatch',
                  'Delivered':  'Delivered',
                  'Delayed':    'Delayed',
                };
                return (
                  <tr key={o.id}>
                    <td><span className="order-id">#{o.id}</span></td>
                    <td>{o.customer}</td>
                    <td className="text-center">{o.itemCount}</td>
                    <td><span className="stage-chip">{stageMap[o.status] ?? o.status}</span></td>
                    <td className="text-muted">{o.expectedDispatch}</td>
                    <td><strong>₹{o.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></td>
                    <td><StatusBadge status={o.status} /></td>
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

export default Fulfillment;
