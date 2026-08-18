import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    warehouseName: 'WarehouseAI Operations',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    lowStockThreshold: 20,
    criticalStockThreshold: 10,
    autoAllocation: true,
    aiRecommendations: true,
    emailAlerts: true,
    slackAlerts: false,
    reorderAlerts: true,
    fulfillmentTarget: 96,
    pickingTarget: 50,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page-content">
      <div className="settings-layout">
        <div className="card settings-card">
          <div className="card-header"><h2 className="card-title">⚙️ Warehouse Configuration</h2></div>
          <div className="settings-section">
            <h3 className="settings-section-title">General</h3>
            <div className="settings-field">
              <label>Warehouse Name</label>
              <input className="settings-input" value={form.warehouseName} onChange={e => setForm(f => ({ ...f, warehouseName: e.target.value }))} />
            </div>
            <div className="settings-field">
              <label>Timezone</label>
              <select className="settings-input" value={form.timezone} onChange={e => setForm(f => ({ ...f, timezone: e.target.value }))}>
                <option>Asia/Kolkata</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
                <option>Asia/Tokyo</option>
              </select>
            </div>
            <div className="settings-field">
              <label>Currency</label>
              <select className="settings-input" value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}>
                <option>USD</option><option>EUR</option><option>GBP</option><option>INR</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">Inventory Thresholds</h3>
            <div className="settings-field">
              <label>Low Stock Threshold (units)</label>
              <input type="number" className="settings-input" value={form.lowStockThreshold} onChange={e => setForm(f => ({ ...f, lowStockThreshold: Number(e.target.value) }))} />
            </div>
            <div className="settings-field">
              <label>Critical Stock Threshold (units)</label>
              <input type="number" className="settings-input" value={form.criticalStockThreshold} onChange={e => setForm(f => ({ ...f, criticalStockThreshold: Number(e.target.value) }))} />
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">AI & Automation</h3>
            {[
              { key: 'autoAllocation', label: 'Auto Allocation', desc: 'Automatically allocate orders to optimal zones' },
              { key: 'aiRecommendations', label: 'AI Recommendations', desc: 'Enable AI-powered allocation and routing suggestions' },
            ].map(s => (
              <div key={s.key} className="settings-toggle">
                <div>
                  <p className="toggle-label">{s.label}</p>
                  <p className="toggle-desc">{s.desc}</p>
                </div>
                <button
                  className={`toggle-btn ${form[s.key as keyof typeof form] ? 'toggle-on' : 'toggle-off'}`}
                  onClick={() => setForm(f => ({ ...f, [s.key]: !f[s.key as keyof typeof f] }))}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            ))}
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">Notifications</h3>
            {[
              { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive critical alerts via email' },
              { key: 'slackAlerts', label: 'Slack Integration', desc: 'Send alerts to Slack channels' },
              { key: 'reorderAlerts', label: 'Reorder Alerts', desc: 'Alert when stock falls below threshold' },
            ].map(s => (
              <div key={s.key} className="settings-toggle">
                <div>
                  <p className="toggle-label">{s.label}</p>
                  <p className="toggle-desc">{s.desc}</p>
                </div>
                <button
                  className={`toggle-btn ${form[s.key as keyof typeof form] ? 'toggle-on' : 'toggle-off'}`}
                  onClick={() => setForm(f => ({ ...f, [s.key]: !f[s.key as keyof typeof f] }))}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            ))}
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">Performance Targets</h3>
            <div className="settings-field">
              <label>Fulfillment Rate Target (%)</label>
              <input type="number" className="settings-input" min={80} max={100} value={form.fulfillmentTarget} onChange={e => setForm(f => ({ ...f, fulfillmentTarget: Number(e.target.value) }))} />
            </div>
            <div className="settings-field">
              <label>Daily Picks Target per Picker</label>
              <input type="number" className="settings-input" min={20} max={150} value={form.pickingTarget} onChange={e => setForm(f => ({ ...f, pickingTarget: Number(e.target.value) }))} />
            </div>
          </div>

          <div className="settings-footer">
            <button className={`btn btn-primary btn-lg ${saved ? 'btn-success' : ''}`} onClick={handleSave}>
              {saved ? '✓ Settings Saved!' : 'Save Settings'}
            </button>
            <button className="btn btn-ghost">Reset to Defaults</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
