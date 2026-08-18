import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Cell
} from 'recharts';
import { fulfillmentTrend, ordersPerHour, pickingProductivity, inventoryTurnover, warehouseUtilization } from '../data/warehouseData';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

const Analytics: React.FC = () => {
  const [range, setRange] = useState<'Today' | '7 Days' | '30 Days' | 'Custom'>('Today');

  const kpis = [
    { label: 'Fulfillment Rate', value: '96.8%', trend: '+1.2%', up: true },
    { label: 'Orders Processed', value: '92', trend: '+12%', up: true },
    { label: 'Avg Pick Time', value: '3m 45s', trend: '-8%', up: true },
    { label: 'Picking Accuracy', value: '98.4%', trend: '+0.3%', up: true },
    { label: 'Packing Accuracy', value: '99.1%', trend: '+0.1%', up: true },
    { label: 'Inventory Turnover', value: '6.1x', trend: '+0.5x', up: true },
  ];

  return (
    <div className="page-content">
      {/* Range Filter */}
      <div className="analytics-header">
        <h2 className="section-title">Business Intelligence Dashboard</h2>
        <div className="range-filters">
          {(['Today', '7 Days', '30 Days', 'Custom'] as const).map(r => (
            <button key={r} className={`tab-btn ${range === r ? 'tab-btn-active' : ''}`} onClick={() => setRange(r)}>{r}</button>
          ))}
        </div>
      </div>

      {/* KPI Strip */}
      <div className="analytics-kpi-grid">
        {kpis.map(k => (
          <div key={k.label} className="analytics-kpi">
            <span className="analytics-kpi-label">{k.label}</span>
            <span className="analytics-kpi-value">{k.value}</span>
            <span className={`analytics-kpi-trend ${k.up ? 'trend-up' : 'trend-down'}`}>
              {k.up ? '↑' : '↓'} {k.trend} vs yesterday
            </span>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-two-col">
        <div className="card">
          <div className="card-header"><h2 className="card-title">Fulfillment Performance</h2></div>
          <div style={{ padding: '0 20px 24px' }}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={fulfillmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} dot={false} name="Orders" />
                <Line type="monotone" dataKey="fulfilled" stroke="#10b981" strokeWidth={2} dot={false} name="Fulfilled" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h2 className="card-title">Orders per Hour</h2></div>
          <div style={{ padding: '0 20px 24px' }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ordersPerHour}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} tickFormatter={h => `${h}:00`} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="orders" name="Orders" radius={[4, 4, 0, 0]}>
                  {ordersPerHour.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-two-col">
        <div className="card">
          <div className="card-header"><h2 className="card-title">Picking Productivity</h2></div>
          <div style={{ padding: '0 20px 24px' }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={pickingProductivity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={60} />
                <Tooltip />
                <Legend />
                <Bar dataKey="picks" fill="#6366f1" name="Picks" radius={[0, 4, 4, 0]} />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h2 className="card-title">Inventory Turnover (6 Months)</h2></div>
          <div style={{ padding: '0 20px 24px' }}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={inventoryTurnover}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[3, 7]} />
                <Tooltip />
                <Line type="monotone" dataKey="turnover" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} name="Turnover" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="charts-two-col">
        <div className="card">
          <div className="card-header"><h2 className="card-title">Warehouse Utilization by Zone</h2></div>
          <div style={{ padding: '0 20px 24px' }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={warehouseUtilization}>
                <XAxis dataKey="zone" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v: any) => `${v}%`} />
                <Bar dataKey="used" name="Utilization %" radius={[4, 4, 0, 0]}>
                  {warehouseUtilization.map((entry, i) => (
                    <Cell key={i} fill={entry.used > 85 ? '#ef4444' : entry.used > 70 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h2 className="card-title">Operational Radar</h2></div>
          <div style={{ padding: '0 20px 24px' }}>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={[
                { metric: 'Fulfillment', A: 97 },
                { metric: 'Picking', A: 98 },
                { metric: 'Packing', A: 99 },
                { metric: 'Allocation', A: 94 },
                { metric: 'Stock Mgmt', A: 88 },
                { metric: 'Dispatch', A: 96 },
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[80, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Performance" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
