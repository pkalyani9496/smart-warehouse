import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import { exceptions } from '../data/warehouseData';
import type { ExceptionSeverity } from '../data/warehouseData';

const Exceptions: React.FC = () => {
  const [filter, setFilter] = useState<'All' | ExceptionSeverity>('All');
  const [resolved, setResolved] = useState<Set<string>>(
    new Set(exceptions.filter(e => e.resolved).map(e => e.id))
  );

  const handleResolve = (id: string) => {
    setResolved(prev => new Set([...prev, id]));
  };

  const counts = {
    Critical: exceptions.filter(e => e.severity === 'Critical').length,
    High:     exceptions.filter(e => e.severity === 'High').length,
    Medium:   exceptions.filter(e => e.severity === 'Medium').length,
    Low:      exceptions.filter(e => e.severity === 'Low').length,
  };

  const filtered = exceptions.filter(e => {
    if (filter !== 'All' && e.severity !== filter) return false;
    return true;
  });

  const severityIcon: Record<ExceptionSeverity, string> = {
    Critical: '🔴',
    High: '🟠',
    Medium: '🟡',
    Low: '🔵',
  };

  return (
    <div className="page-content">
      {/* Summary Cards */}
      <div className="exception-summary">
        {(['All', 'Critical', 'High', 'Medium', 'Low'] as const).map(s => (
          <button
            key={s}
            className={`exc-sum-card exc-sum-${s.toLowerCase()} ${filter === s ? 'exc-sum-active' : ''}`}
            onClick={() => setFilter(s)}
          >
            <span className="exc-sum-count">
              {s === 'All' ? exceptions.length : counts[s as ExceptionSeverity]}
            </span>
            <span className="exc-sum-label">{s === 'All' ? 'Total Exceptions' : `${s} Priority`}</span>
          </button>
        ))}
      </div>

      {/* Exception Cards */}
      <div className="exceptions-list">
        {filtered.map(ex => {
          const isResolved = resolved.has(ex.id);
          return (
            <div key={ex.id} className={`exception-card exc-${ex.severity.toLowerCase()} ${isResolved ? 'exc-resolved' : ''}`}>
              <div className="exc-card-header">
                <div className="exc-severity-group">
                  <span className="exc-icon">{severityIcon[ex.severity]}</span>
                  <StatusBadge status={ex.severity} variant={ex.severity === 'Critical' ? 'danger' : ex.severity === 'High' ? 'warning' : ex.severity === 'Medium' ? 'info' : 'neutral'} />
                  <span className="exc-id">{ex.id}</span>
                </div>
                <div className="exc-meta">
                  <span className="text-muted">Detected {ex.detectedAt}</span>
                  {isResolved && <span className="badge badge-success">Resolved</span>}
                </div>
              </div>
              <h3 className="exc-title">{ex.title}</h3>
              <p className="exc-desc">{ex.description}</p>
              <div className="exc-details">
                <div className="exc-detail-item">
                  <span className="exc-detail-label">Affected Zone</span>
                  <span className="zone-badge">{ex.zone}</span>
                </div>
                {ex.affectedOrders.length > 0 && (
                  <div className="exc-detail-item">
                    <span className="exc-detail-label">Affected Orders</span>
                    <div className="order-tags">
                      {ex.affectedOrders.map(o => (
                        <span key={o} className="order-id">#{o}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="exc-detail-item">
                  <span className="exc-detail-label">Recommended Action</span>
                  <p className="exc-recommendation">💡 {ex.recommendedAction}</p>
                </div>
              </div>
              {!isResolved && (
                <div className="exc-actions">
                  <button className="btn btn-primary" onClick={() => handleResolve(ex.id)}>
                    ✓ Resolve Exception
                  </button>
                  <button className="btn btn-secondary">Escalate</button>
                  <button className="btn btn-ghost">View Details</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Exceptions;
