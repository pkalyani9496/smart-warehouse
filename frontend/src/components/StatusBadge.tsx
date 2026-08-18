import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';

const variantMap: Record<string, BadgeVariant> = {
  'Auto Allocated': 'success',
  'Manual Review': 'warning',
  'Reserved': 'purple',
  'Waiting': 'neutral',
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Critical': 'danger',
  'Out of Stock': 'danger',
  'Processing': 'info',
  'Picking': 'purple',
  'Packing': 'purple',
  'Dispatched': 'success',
  'Delivered': 'success',
  'Delayed': 'danger',
  'Cancelled': 'neutral',
  'Active': 'success',
  'Available': 'info',
  'Maintenance': 'warning',
  'Not Started': 'neutral',
  'In Progress': 'purple',
  'Picked': 'success',
  'Quality Check': 'warning',
};

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant }) => {
  const resolvedVariant = variant || variantMap[status] || 'neutral';
  return <span className={`badge badge-${resolvedVariant}`}>{status}</span>;
};

export default StatusBadge;
