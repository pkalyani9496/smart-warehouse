import React, { useState } from 'react';
import { kpiSummary } from '../data/warehouseData';

interface SimParam {
  id: string;
  label: string;
  icon: string;
  min: number;
  max: number;
  default: number;
  unit: string;
  step: number;
}

const params: SimParam[] = [
  { id: 'orderVolume',   label: 'Order Volume Increase',       icon: '📋', min: 0,  max: 200, default: 0,   unit: '%',     step: 5 },
  { id: 'workforce',     label: 'Workforce Reduction',          icon: '👷', min: 0,  max: 80,  default: 0,   unit: '%',     step: 5 },
  { id: 'inventoryShort',label: 'Inventory Shortage',          icon: '📦', min: 0,  max: 100, default: 0,   unit: '%',     step: 5 },
  { id: 'capacity',      label: 'Warehouse Capacity Reduction', icon: '🏭', min: 0,  max: 60,  default: 0,   unit: '%',     step: 5 },
  { id: 'extraStations', label: 'Additional Packing Stations',  icon: '🔧', min: 0,  max: 10,  default: 0,   unit: 'units', step: 1 },
  { id: 'extraPickers',  label: 'Additional Pickers',           icon: '👤', min: 0,  max: 20,  default: 0,   unit: 'people', step: 1 },
];

interface SimResults {
  fulfillmentRate: number;
  processingTime: string;
  pickingWorkload: string;
  packingWorkload: string;
  bottleneckProb: number;
  estCost: number;
  aiPrediction: string;
}

function computeResults(values: Record<string, number>): SimResults {
  const base = kpiSummary.fulfillmentRate;
  let rate = base;
  let pickLoad = 'Normal';
  let packLoad = 'Normal';
  let bottleneck = 18;
  let costDelta = 0;

  // Order volume impact
  const volPct = values.orderVolume / 100;
  rate -= volPct * 15;
  bottleneck += volPct * 30;
  if (volPct > 0.5) { pickLoad = 'High'; packLoad = 'High'; }

  // Workforce reduction
  const wfPct = values.workforce / 100;
  rate -= wfPct * 20;
  bottleneck += wfPct * 40;
  if (wfPct > 0.3) pickLoad = 'Critical';

  // Inventory shortage
  const invPct = values.inventoryShort / 100;
  rate -= invPct * 25;
  bottleneck += invPct * 25;

  // Capacity reduction
  const capPct = values.capacity / 100;
  rate -= capPct * 12;
  bottleneck += capPct * 20;

  // Extra stations
  rate += values.extraStations * 0.4;
  packLoad = values.extraStations >= 2 ? 'Low' : packLoad;
  costDelta += values.extraStations * 850;

  // Extra pickers
  rate += values.extraPickers * 0.65;
  pickLoad = values.extraPickers >= 2 ? 'Low' : pickLoad;
  costDelta += values.extraPickers * 320;

  rate = Math.min(99.9, Math.max(40, rate));
  bottleneck = Math.min(95, Math.max(5, bottleneck));

  const baseTime = 138; // minutes
  const timeChange = (baseTime * (1 + volPct * 0.4) * (1 + wfPct * 0.5)) / (1 + values.extraPickers * 0.08);
  const hours = Math.floor(timeChange / 60);
  const mins = Math.round(timeChange % 60);

  // AI Prediction text
  let aiPrediction = '';
  if (values.extraPickers > 0 && values.extraStations > 0) {
    aiPrediction = `Adding ${values.extraPickers} pickers and ${values.extraStations} packing station${values.extraStations > 1 ? 's' : ''} is predicted to improve fulfillment rate from ${base}% to ${rate.toFixed(1)}% and reduce processing time by ${Math.round((1 - timeChange / baseTime) * 100 * -1)}%.`;
  } else if (values.extraPickers > 0) {
    aiPrediction = `Adding ${values.extraPickers} additional picker${values.extraPickers > 1 ? 's' : ''} is predicted to improve fulfillment rate from ${base}% to ${rate.toFixed(1)}%.`;
  } else if (values.orderVolume > 0) {
    aiPrediction = `A ${values.orderVolume}% increase in order volume is predicted to reduce fulfillment rate to ${rate.toFixed(1)}% and increase processing time to ${hours}h ${mins}m. Consider scaling workforce by ${Math.ceil(values.orderVolume / 20)} pickers.`;
  } else if (values.workforce > 0) {
    aiPrediction = `A ${values.workforce}% workforce reduction will likely drop fulfillment rate to ${rate.toFixed(1)}%. Bottleneck probability rises to ${bottleneck.toFixed(0)}%.`;
  } else {
    aiPrediction = `Current simulation predicts a fulfillment rate of ${rate.toFixed(1)}% with ${hours}h ${mins}m average processing time.`;
  }

  return {
    fulfillmentRate: parseFloat(rate.toFixed(1)),
    processingTime: `${hours}h ${mins}m`,
    pickingWorkload: pickLoad,
    packingWorkload: packLoad,
    bottleneckProb: parseFloat(bottleneck.toFixed(0)),
    estCost: Math.round(costDelta),
    aiPrediction,
  };
}

const WhatIfSimulator: React.FC = () => {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(params.map(p => [p.id, p.default]))
  );
  const [results, setResults] = useState<SimResults | null>(null);
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => {
      setResults(computeResults(values));
      setRunning(false);
    }, 1200);
  };

  const handleReset = () => {
    setValues(Object.fromEntries(params.map(p => [p.id, p.default])));
    setResults(null);
  };

  const baseRate = kpiSummary.fulfillmentRate;
  const rateChange = results ? results.fulfillmentRate - baseRate : 0;

  return (
    <div className="page-content">
      <div className="simulator-layout">
        {/* Controls */}
        <div className="card sim-controls">
          <div className="card-header">
            <h2 className="card-title">🎛️ Simulation Parameters</h2>
          </div>
          <div className="sim-params">
            {params.map(p => (
              <div key={p.id} className="sim-param">
                <div className="sim-param-header">
                  <span>{p.icon} {p.label}</span>
                  <span className="sim-param-value">{values[p.id]} {p.unit}</span>
                </div>
                <input
                  type="range"
                  min={p.min}
                  max={p.max}
                  step={p.step}
                  value={values[p.id]}
                  onChange={e => setValues(v => ({ ...v, [p.id]: Number(e.target.value) }))}
                  className="sim-slider"
                />
                <div className="sim-slider-labels">
                  <span>{p.min}{p.unit === '%' ? '%' : ''}</span>
                  <span>{p.max}{p.unit === '%' ? '%' : ''}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="sim-actions">
            <button className={`btn btn-primary btn-lg ${running ? 'btn-loading' : ''}`} onClick={handleRun} disabled={running}>
              {running ? '⏳ Running Simulation…' : '▶ Run Simulation'}
            </button>
            <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Results */}
        <div className="sim-results-col">
          {!results && !running && (
            <div className="sim-placeholder">
              <div className="sim-placeholder-icon">🎛️</div>
              <p>Adjust parameters and run the simulation to see AI predictions.</p>
            </div>
          )}

          {running && (
            <div className="sim-placeholder">
              <div className="sim-spinner" />
              <p>Running AI simulation…</p>
            </div>
          )}

          {results && !running && (
            <>
              {/* AI Prediction */}
              <div className="ai-prediction-card">
                <div className="ai-pred-header">
                  <span className="ai-pred-icon">🤖</span>
                  <strong>AI Prediction</strong>
                </div>
                <p className="ai-pred-text">"{results.aiPrediction}"</p>
              </div>

              {/* Result KPIs */}
              <div className="sim-result-grid">
                <div className={`sim-result-kpi ${rateChange >= 0 ? 'result-positive' : 'result-negative'}`}>
                  <span className="sim-result-label">Fulfillment Rate</span>
                  <span className="sim-result-value">{results.fulfillmentRate}%</span>
                  <span className="sim-result-delta">{rateChange >= 0 ? '↑' : '↓'} {Math.abs(rateChange).toFixed(1)}%</span>
                </div>
                <div className="sim-result-kpi">
                  <span className="sim-result-label">Processing Time</span>
                  <span className="sim-result-value">{results.processingTime}</span>
                  <span className="sim-result-delta text-muted">avg per order</span>
                </div>
                <div className={`sim-result-kpi ${results.bottleneckProb > 50 ? 'result-negative' : 'result-positive'}`}>
                  <span className="sim-result-label">Bottleneck Probability</span>
                  <span className="sim-result-value">{results.bottleneckProb}%</span>
                  <span className="sim-result-delta">{results.bottleneckProb > 50 ? '⚠️ High Risk' : '✅ Manageable'}</span>
                </div>
                <div className={`sim-result-kpi ${results.estCost > 0 ? 'result-neutral' : ''}`}>
                  <span className="sim-result-label">Additional Cost</span>
                  <span className="sim-result-value">₹{results.estCost.toLocaleString('en-IN')}</span>
                  <span className="sim-result-delta text-muted">/day estimate</span>
                </div>
              </div>

              <div className="sim-workload-cards">
                <div className="sim-workload-card">
                  <span>🔄 Picking Workload</span>
                  <span className={`workload-${results.pickingWorkload.toLowerCase()}`}>{results.pickingWorkload}</span>
                </div>
                <div className="sim-workload-card">
                  <span>📦 Packing Workload</span>
                  <span className={`workload-${results.packingWorkload.toLowerCase()}`}>{results.packingWorkload}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulator;
