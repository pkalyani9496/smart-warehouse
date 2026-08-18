import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { products } from '../data/warehouseData';

const Inventory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');

  const inStock   = products.filter(p => p.status === 'In Stock').length;
  const lowStock  = products.filter(p => p.status === 'Low Stock').length;
  const critical  = products.filter(p => p.status === 'Critical').length;
  const outStock  = products.filter(p => p.status === 'Out of Stock').length;
  const totalValue = products.reduce((s, p) => s + p.currentStock * p.unitPrice, 0);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.sku.toLowerCase().includes(search.toLowerCase());
    const matchZone = zoneFilter === 'All' || p.zone === zoneFilter;
    return matchSearch && matchZone;
  });

  return (
    <div className="page-content">
      <div className="kpi-grid">
        <KPICard title="Total Products" value={products.length} icon="📦" accent="purple" />
        <KPICard title="In Stock" value={inStock} icon="✅" accent="green" />
        <KPICard title="Low Stock" value={lowStock} icon="⚠️" accent="amber" />
        <KPICard title="Critical / Out" value={`${critical} / ${outStock}`} icon="🔴" accent="red" />
        <KPICard title="Total Inventory Value" value={`₹${Math.round(totalValue).toLocaleString('en-IN')}`} icon="💰" accent="blue" />
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Inventory Catalog</h2>
          <div className="filters">
            <input
              className="search-input"
              placeholder="Search product or SKU…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="filter-select" value={zoneFilter} onChange={e => setZoneFilter(e.target.value)}>
              <option>All</option>
              <option>A</option><option>B</option><option>C</option><option>D</option>
            </select>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th><th>SKU</th><th>Category</th><th>Unit Price</th>
                <th>Current Stock</th><th>Reserved</th><th>Available</th>
                <th>Reorder Level</th><th>Zone</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-thumb-wrap">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="product-thumb"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      </div>
                      <div className="product-info-col">
                        <span className="product-name">{p.name}</span>
                        <span className="product-sub-category">{p.category} · {p.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td><code className="sku-code">{p.sku}</code></td>
                  <td>{p.category}</td>
                  <td><strong>₹{p.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></td>
                  <td className="text-center"><strong>{p.currentStock}</strong></td>
                  <td className="text-center text-muted">{p.reservedStock}</td>
                  <td className="text-center">
                    <span className={p.availableStock < p.reorderLevel ? 'text-danger' : ''}>{p.availableStock}</span>
                  </td>
                  <td className="text-center text-muted">{p.reorderLevel}</td>
                  <td className="text-center"><span className="zone-badge">Zone {p.zone}</span></td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
