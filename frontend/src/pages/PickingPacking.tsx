import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import { orders, packingStations, zoneWorkload } from '../data/warehouseData';

const pickingOrders = orders.filter(o =>
  ['Processing', 'Picking'].includes(o.status)
);

const PickingPacking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'picking' | 'packing'>('picking');
  const [assignedOrder, setAssignedOrder] = useState<string | null>(null);

  const toPick      = orders.filter(o => o.status === 'Processing').length;
  const inProgress  = orders.filter(o => o.status === 'Picking').length;
  const packed      = orders.filter(o => o.status === 'Packing' || o.status === 'Dispatched').length;

  const workflow = ['Order Received', 'Picking', 'Quality Check', 'Packing', 'Ready for Dispatch'];

  return (
    <div className="page-content">
      <div className="kpi-grid">
        <KPICard title="Orders to Pick" value={toPick} icon="📋" accent="purple" />
        <KPICard title="Picking in Progress" value={inProgress} icon="🔄" accent="blue" />
        <KPICard title="Packed Orders" value={packed} icon="📦" accent="green" />
        <KPICard title="Avg Pick Time" value="3m 45s" icon="⏱️" accent="amber" />
        <KPICard title="Picking Accuracy" value="98.4%" icon="🎯" accent="green" trend="0.3% vs yesterday" trendUp />
        <KPICard title="Packing Accuracy" value="99.1%" icon="✅" accent="green" />
      </div>

      {/* Workflow Steps */}
      <div className="card">
        <div className="card-header"><h2 className="card-title">Picking & Packing Workflow</h2></div>
        <div className="workflow-steps">
          {workflow.map((step, i) => (
            <React.Fragment key={step}>
              <div className={`workflow-step ${i < 2 ? 'workflow-active' : i < 4 ? 'workflow-pending' : ''}`}>
                <div className="workflow-circle">{i + 1}</div>
                <span className="workflow-label">{step}</span>
              </div>
              {i < workflow.length - 1 && <div className={`workflow-arrow ${i < 1 ? 'arrow-active' : ''}`}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="card-header">
          <div className="tab-group">
            <button className={`tab-btn ${activeTab === 'picking' ? 'tab-btn-active' : ''}`} onClick={() => setActiveTab('picking')}>🔄 Picking</button>
            <button className={`tab-btn ${activeTab === 'packing' ? 'tab-btn-active' : ''}`} onClick={() => setActiveTab('packing')}>📦 Packing Stations</button>
          </div>
        </div>

        {activeTab === 'picking' && (
          <>
            {/* Bottleneck Alert */}
            {zoneWorkload.some(z => z.utilization > 85) && (
              <div className="alert-card alert-warning">
                <span className="alert-icon">⚠️</span>
                <div>
                  <strong>Bottleneck Detected</strong>
                  <p>Zone B picking workload is 24% above average. Consider reassigning pickers.</p>
                </div>
              </div>
            )}

            {/* Zone Workload */}
            <div className="zone-workload-grid" style={{ padding: '0 20px 20px' }}>
              {zoneWorkload.map(z => (
                <div key={z.zone} className="zone-workload-card">
                  <span className="zone-name">{z.zone}</span>
                  <span className={`zone-util ${z.utilization > 85 ? 'util-red' : z.utilization > 70 ? 'util-amber' : 'util-green'}`}>{z.utilization}%</span>
                  <ProgressBar value={z.utilization} showLabel={false} height={5} color={z.utilization > 85 ? 'red' : z.utilization > 70 ? 'amber' : 'green'} />
                  <div className="zone-mini-stat"><span>👷 {z.pickers} pickers</span><span>📋 {z.activeOrders} orders</span></div>
                </div>
              ))}
            </div>

            {/* Picking Table */}
            <div className="table-wrap" style={{ padding: '0 20px 20px' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th><th>Items</th><th>Picker</th><th>Zone</th><th>Priority</th><th>Pick Progress</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pickingOrders.map(o => (
                    <tr key={o.id}>
                      <td>
                        <div>
                          <span className="order-id">#{o.id}</span>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>{o.customer}</div>
                        </div>
                      </td>
                      <td className="text-center">{o.itemCount}</td>
                      <td>{o.picker !== '—' ? o.picker : <span className="text-muted">Unassigned</span>}</td>
                      <td><span className="zone-badge">Zone {o.zone}</span></td>
                      <td><StatusBadge status={o.priority} variant={o.priority === 'Critical' ? 'danger' : o.priority === 'High' ? 'warning' : o.priority === 'Medium' ? 'info' : 'neutral'} /></td>
                      <td style={{ minWidth: 160 }}>
                        <ProgressBar value={o.pickProgress} height={8} color={o.pickProgress === 100 ? 'green' : 'purple'} showLabel />
                        <div className="text-muted" style={{ fontSize: '0.7rem', marginTop: 2 }}>{o.fulfilledItems}/{o.itemCount} items picked</div>
                      </td>
                      <td><StatusBadge status={o.pickStatus} /></td>
                      <td>
                        <div className="btn-group">
                          {o.pickStatus === 'Not Started' && (
                            <button className="btn btn-sm btn-primary">Start Picking</button>
                          )}
                          {o.pickStatus === 'In Progress' && (
                            <>
                              <button className="btn btn-sm btn-secondary">Assign Picker</button>
                              <button
                                className={`btn btn-sm ${assignedOrder === o.id ? 'btn-success' : 'btn-primary'}`}
                                onClick={() => setAssignedOrder(o.id)}
                              >
                                {assignedOrder === o.id ? '✓ Marked' : 'Mark Picked'}
                              </button>
                            </>
                          )}
                          {o.pickStatus === 'Picked' && (
                            <button className="btn btn-sm btn-success">Move to Packing</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'packing' && (
          <div style={{ padding: '20px' }}>
            <div className="station-grid">
              {packingStations.map(s => (
                <div key={s.id} className={`station-card station-${s.status.toLowerCase()}`}>
                  <div className="station-header">
                    <span className="station-id">Station {s.id}</span>
                    <StatusBadge status={s.status} />
                  </div>
                  {s.currentOrder ? (
                    <>
                      <div className="station-detail">
                        <span className="station-label">Current Order</span>
                        <span className="order-id">#{s.currentOrder}</span>
                      </div>
                      <div className="station-detail">
                        <span className="station-label">Operator</span>
                        <span>{s.operator}</span>
                      </div>
                      <div className="station-detail">
                        <span className="station-label">Items</span>
                        <span>{s.items}</span>
                      </div>
                      <div className="station-detail">
                        <span className="station-label">Avg Time</span>
                        <span className={s.status === 'Delayed' ? 'text-danger' : ''}>{s.avgTime}</span>
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <ProgressBar value={s.progress} height={10} color={s.status === 'Delayed' ? 'red' : 'green'} showLabel />
                      </div>
                    </>
                  ) : (
                    <div className="station-idle">
                      {s.status === 'Maintenance' ? '🔧 Under Maintenance' : '✅ Ready for Assignment'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickingPacking;
