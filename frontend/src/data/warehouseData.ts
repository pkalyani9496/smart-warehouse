// ─── Shared Warehouse Sample Data ─────────────────────────────────────────────

export type OrderStatus = 'Processing' | 'Picking' | 'Packing' | 'Dispatched' | 'Delivered' | 'Delayed' | 'Cancelled';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type AllocationStatus = 'Auto Allocated' | 'Manual Review' | 'Reserved' | 'Waiting';
export type PickStatus = 'Not Started' | 'In Progress' | 'Picked' | 'Quality Check';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Critical' | 'Out of Stock';
export type StationStatus = 'Active' | 'Available' | 'Maintenance' | 'Delayed';
export type ExceptionSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

// ─── Products / Inventory ─────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderLevel: number;
  zone: string;
  status: StockStatus;
  imageUrl: string;
  unitPrice: number;
}

export const products: Product[] = [
  { id: 'P001', name: 'Wireless Headphones', sku: 'WH-4502', category: 'Electronics', currentStock: 248, reservedStock: 120, availableStock: 128, reorderLevel: 50, zone: 'A', status: 'In Stock', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80', unitPrice: 7499.00 },
  { id: 'P002', name: 'Laptop Stand', sku: 'LS-2210', category: 'Accessories', currentStock: 45, reservedStock: 30, availableStock: 15, reorderLevel: 20, zone: 'B', status: 'Low Stock', imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=200&q=80', unitPrice: 2899.00 },
  { id: 'P003', name: 'Mechanical Keyboard', sku: 'MK-7701', category: 'Electronics', currentStock: 182, reservedStock: 60, availableStock: 122, reorderLevel: 40, zone: 'A', status: 'In Stock', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80', unitPrice: 10799.00 },
  { id: 'P004', name: 'USB-C Cable (2m)', sku: 'UC-3301', category: 'Cables', currentStock: 12, reservedStock: 10, availableStock: 2, reorderLevel: 30, zone: 'C', status: 'Critical', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80', unitPrice: 1099.00 },
  { id: 'P005', name: 'Smart Watch', sku: 'SW-8801', category: 'Wearables', currentStock: 97, reservedStock: 45, availableStock: 52, reorderLevel: 25, zone: 'B', status: 'In Stock', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80', unitPrice: 20799.00 },
  { id: 'P006', name: 'Bluetooth Speaker', sku: 'BS-5502', category: 'Electronics', currentStock: 0, reservedStock: 0, availableStock: 0, reorderLevel: 20, zone: 'D', status: 'Out of Stock', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=200&q=80', unitPrice: 4999.00 },
  { id: 'P007', name: 'Wireless Mouse', sku: 'WM-1102', category: 'Accessories', currentStock: 310, reservedStock: 80, availableStock: 230, reorderLevel: 60, zone: 'A', status: 'In Stock', imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80', unitPrice: 3299.00 },
  { id: 'P008', name: 'Ergonomic Chair', sku: 'EC-9901', category: 'Furniture', currentStock: 22, reservedStock: 8, availableStock: 14, reorderLevel: 10, zone: 'D', status: 'Low Stock', imageUrl: 'https://images.unsplash.com/photo-1580481077195-c228c388789f?auto=format&fit=crop&w=200&q=80', unitPrice: 33199.00 },
  { id: 'P009', name: '4K Monitor', sku: 'MN-6601', category: 'Electronics', currentStock: 67, reservedStock: 20, availableStock: 47, reorderLevel: 15, zone: 'C', status: 'In Stock', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80', unitPrice: 37349.00 },
  { id: 'P010', name: 'Gaming Headset', sku: 'GH-3302', category: 'Gaming', currentStock: 138, reservedStock: 55, availableStock: 83, reorderLevel: 30, zone: 'B', status: 'In Stock', imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=200&q=80', unitPrice: 6639.00 },
];

// ─── Orders ───────────────────────────────────────────────────────────────────
export interface Order {
  id: string;
  customer: string;
  product: string;
  sku: string;
  quantity: number;
  zone: string;
  priority: Priority;
  status: OrderStatus;
  allocationStatus: AllocationStatus;
  pickStatus: PickStatus;
  picker: string;
  pickProgress: number;
  expectedDispatch: string;
  itemCount: number;
  fulfilledItems: number;
  value: number;
}

export const orders: Order[] = [
  { id: 'SW-1042', customer: 'TechCorp Ltd', product: 'Wireless Headphones', sku: 'WH-4502', quantity: 6, zone: 'A', priority: 'High', status: 'Picking', allocationStatus: 'Auto Allocated', pickStatus: 'In Progress', picker: 'Alex M.', pickProgress: 67, expectedDispatch: '2026-08-18 14:00', itemCount: 6, fulfilledItems: 4, value: 539.94 },
  { id: 'SW-1043', customer: 'StartupXYZ', product: 'Mechanical Keyboard', sku: 'MK-7701', quantity: 3, zone: 'A', priority: 'Medium', status: 'Processing', allocationStatus: 'Auto Allocated', pickStatus: 'Not Started', picker: '—', pickProgress: 0, expectedDispatch: '2026-08-18 16:00', itemCount: 3, fulfilledItems: 0, value: 389.97 },
  { id: 'SW-1044', customer: 'CloudBase Inc', product: 'Smart Watch', sku: 'SW-8801', quantity: 2, zone: 'B', priority: 'Critical', status: 'Packing', allocationStatus: 'Reserved', pickStatus: 'Picked', picker: 'Sara P.', pickProgress: 100, expectedDispatch: '2026-08-18 13:30', itemCount: 2, fulfilledItems: 2, value: 499.98 },
  { id: 'SW-1045', customer: 'Retail Hub', product: 'USB-C Cable (2m)', sku: 'UC-3301', quantity: 20, zone: 'C', priority: 'High', status: 'Delayed', allocationStatus: 'Manual Review', pickStatus: 'Not Started', picker: '—', pickProgress: 0, expectedDispatch: '2026-08-18 12:00', itemCount: 20, fulfilledItems: 0, value: 259.80 },
  { id: 'SW-1046', customer: 'MediaStream', product: 'Wireless Mouse', sku: 'WM-1102', quantity: 10, zone: 'A', priority: 'Low', status: 'Processing', allocationStatus: 'Auto Allocated', pickStatus: 'Not Started', picker: '—', pickProgress: 0, expectedDispatch: '2026-08-19 09:00', itemCount: 10, fulfilledItems: 0, value: 399.90 },
  { id: 'SW-1047', customer: 'GreenOffice', product: 'Laptop Stand', sku: 'LS-2210', quantity: 5, zone: 'B', priority: 'Medium', status: 'Processing', allocationStatus: 'Waiting', pickStatus: 'Not Started', picker: '—', pickProgress: 0, expectedDispatch: '2026-08-18 17:00', itemCount: 5, fulfilledItems: 0, value: 174.95 },
  { id: 'SW-1048', customer: 'DevHouse', product: '4K Monitor', sku: 'MN-6601', quantity: 1, zone: 'C', priority: 'High', status: 'Picking', allocationStatus: 'Auto Allocated', pickStatus: 'In Progress', picker: 'James R.', pickProgress: 45, expectedDispatch: '2026-08-18 15:00', itemCount: 1, fulfilledItems: 0, value: 449.99 },
  { id: 'SW-1049', customer: 'NexGen Co', product: 'Gaming Headset', sku: 'GH-3302', quantity: 4, zone: 'B', priority: 'Low', status: 'Dispatched', allocationStatus: 'Auto Allocated', pickStatus: 'Picked', picker: 'Priya K.', pickProgress: 100, expectedDispatch: '2026-08-18 11:00', itemCount: 4, fulfilledItems: 4, value: 319.96 },
  { id: 'SW-1050', customer: 'FutureTech', product: 'Ergonomic Chair', sku: 'EC-9901', quantity: 2, zone: 'D', priority: 'Medium', status: 'Delivered', allocationStatus: 'Auto Allocated', pickStatus: 'Picked', picker: 'Tom B.', pickProgress: 100, expectedDispatch: '2026-08-17 16:00', itemCount: 2, fulfilledItems: 2, value: 799.98 },
  { id: 'SW-1051', customer: 'ByteWorks', product: 'Wireless Headphones', sku: 'WH-4502', quantity: 8, zone: 'A', priority: 'Critical', status: 'Processing', allocationStatus: 'Manual Review', pickStatus: 'Not Started', picker: '—', pickProgress: 0, expectedDispatch: '2026-08-18 13:00', itemCount: 8, fulfilledItems: 0, value: 719.92 },
];

// ─── Packing Stations ─────────────────────────────────────────────────────────
export interface PackingStation {
  id: string;
  status: StationStatus;
  currentOrder: string | null;
  operator: string;
  items: number;
  progress: number;
  avgTime: string;
}

export const packingStations: PackingStation[] = [
  { id: 'P-01', status: 'Active', currentOrder: 'SW-1042', operator: 'Alex M.', items: 6, progress: 80, avgTime: '4m 20s' },
  { id: 'P-02', status: 'Active', currentOrder: 'SW-1044', operator: 'Sara P.', items: 2, progress: 95, avgTime: '3m 10s' },
  { id: 'P-03', status: 'Delayed', currentOrder: 'SW-1048', operator: 'James R.', items: 1, progress: 30, avgTime: '7m 50s' },
  { id: 'P-04', status: 'Available', currentOrder: null, operator: '—', items: 0, progress: 0, avgTime: '—' },
  { id: 'P-05', status: 'Maintenance', currentOrder: null, operator: '—', items: 0, progress: 0, avgTime: '—' },
  { id: 'P-06', status: 'Available', currentOrder: null, operator: '—', items: 0, progress: 0, avgTime: '—' },
];

// ─── Exceptions ───────────────────────────────────────────────────────────────
export interface WarehouseException {
  id: string;
  severity: ExceptionSeverity;
  title: string;
  description: string;
  zone: string;
  affectedOrders: string[];
  detectedAt: string;
  recommendedAction: string;
  resolved: boolean;
}

export const exceptions: WarehouseException[] = [
  { id: 'EX-001', severity: 'Critical', title: 'Stock Below Safety Threshold', description: 'Wireless Headphones (WH-4502) stock is critically low. Only 128 units available against reserved 120.', zone: 'Zone A', affectedOrders: ['SW-1042', 'SW-1051'], detectedAt: '10:32 AM', recommendedAction: 'Initiate emergency reorder for 200+ units immediately.', resolved: false },
  { id: 'EX-002', severity: 'Critical', title: 'Out of Stock – Bluetooth Speaker', description: 'Bluetooth Speaker (BS-5502) is completely out of stock. Cannot fulfill pending orders.', zone: 'Zone D', affectedOrders: [], detectedAt: '09:15 AM', recommendedAction: 'Contact supplier for emergency restock. Update order status to Delayed.', resolved: false },
  { id: 'EX-003', severity: 'High', title: 'Zone B Picking Queue Overloaded', description: 'Zone B picking workload is 24% above average capacity. 3 orders are queued with no assigned picker.', zone: 'Zone B', affectedOrders: ['SW-1047', 'SW-1049'], detectedAt: '10:44 AM', recommendedAction: 'Reassign 1 picker from Zone D to Zone B immediately.', resolved: false },
  { id: 'EX-004', severity: 'High', title: 'Order SW-1045 Significantly Delayed', description: 'Order SW-1045 for Retail Hub was due at 12:00. USB-C Cables are critically low (2 units, 20 needed).', zone: 'Zone C', affectedOrders: ['SW-1045'], detectedAt: '12:01 PM', recommendedAction: 'Notify customer of delay. Source from alternate supplier.', resolved: false },
  { id: 'EX-005', severity: 'Medium', title: 'Packing Station P-03 Underperforming', description: 'Station P-03 is operating 15% slower than average. Current order SW-1048 has been in packing for 22 minutes.', zone: 'Zone C', affectedOrders: ['SW-1048'], detectedAt: '10:55 AM', recommendedAction: 'Inspect P-03 for equipment issues. Consider reassigning order.', resolved: false },
  { id: 'EX-006', severity: 'Medium', title: 'Low Stock – Laptop Stand', description: 'Laptop Stand (LS-2210) has only 15 units available with 30 reserved. Reorder level is 20.', zone: 'Zone B', affectedOrders: ['SW-1047'], detectedAt: '11:20 AM', recommendedAction: 'Place reorder for 100 units. ETA 3–5 business days.', resolved: false },
  { id: 'EX-007', severity: 'Low', title: 'USB-C Cable Reorder Overdue', description: 'USB-C Cable reorder was scheduled 3 days ago but not confirmed. Stock now at critical level.', zone: 'Zone C', affectedOrders: ['SW-1045'], detectedAt: '08:00 AM', recommendedAction: 'Contact procurement team to confirm PO status.', resolved: true },
];

// ─── Activity Timeline ────────────────────────────────────────────────────────
export interface ActivityEvent {
  time: string;
  event: string;
  type: 'order' | 'inventory' | 'alert' | 'dispatch' | 'pick' | 'pack';
}

export const activityTimeline: ActivityEvent[] = [
  { time: '10:42 AM', event: 'Order #SW-1042 allocated to Zone A', type: 'order' },
  { time: '10:44 AM', event: 'Picking started in Zone B for SW-1047', type: 'pick' },
  { time: '10:47 AM', event: '4/6 items picked for SW-1042 by Alex M.', type: 'pick' },
  { time: '10:51 AM', event: 'Order SW-1042 moved to Packing Station P-01', type: 'pack' },
  { time: '10:55 AM', event: 'Package SW-1044 ready for dispatch', type: 'dispatch' },
  { time: '11:02 AM', event: 'Inventory alert: USB-C Cable below threshold', type: 'alert' },
  { time: '11:15 AM', event: 'Order #SW-1049 dispatched to NexGen Co', type: 'dispatch' },
  { time: '11:30 AM', event: 'New order SW-1051 received from ByteWorks', type: 'order' },
  { time: '11:45 AM', event: 'AI suggested reallocation: Zone B → Zone A (18% efficiency gain)', type: 'inventory' },
  { time: '12:01 PM', event: 'Delay alert: SW-1045 missed expected dispatch', type: 'alert' },
];

// ─── Analytics Chart Data ─────────────────────────────────────────────────────
export const fulfillmentTrend = [
  { time: '06:00', orders: 12, fulfilled: 11 },
  { time: '07:00', orders: 18, fulfilled: 17 },
  { time: '08:00', orders: 32, fulfilled: 30 },
  { time: '09:00', orders: 45, fulfilled: 43 },
  { time: '10:00', orders: 58, fulfilled: 55 },
  { time: '11:00', orders: 71, fulfilled: 68 },
  { time: '12:00', orders: 85, fulfilled: 82 },
  { time: '13:00', orders: 92, fulfilled: 89 },
];

export const ordersPerHour = [
  { hour: '06', orders: 12 },
  { hour: '07', orders: 18 },
  { hour: '08', orders: 32 },
  { hour: '09', orders: 45 },
  { hour: '10', orders: 58 },
  { hour: '11', orders: 71 },
  { hour: '12', orders: 85 },
  { hour: '13', orders: 92 },
];

export const pickingProductivity = [
  { name: 'Alex M.', picks: 48, target: 50 },
  { name: 'Sara P.', picks: 52, target: 50 },
  { name: 'James R.', picks: 38, target: 50 },
  { name: 'Priya K.', picks: 61, target: 50 },
  { name: 'Tom B.', picks: 44, target: 50 },
];

export const inventoryTurnover = [
  { month: 'Mar', turnover: 4.2 },
  { month: 'Apr', turnover: 4.8 },
  { month: 'May', turnover: 5.1 },
  { month: 'Jun', turnover: 4.9 },
  { month: 'Jul', turnover: 5.6 },
  { month: 'Aug', turnover: 6.1 },
];

export const warehouseUtilization = [
  { zone: 'Zone A', used: 78, capacity: 100 },
  { zone: 'Zone B', used: 91, capacity: 100 },
  { zone: 'Zone C', used: 64, capacity: 100 },
  { zone: 'Zone D', used: 45, capacity: 100 },
];

// ─── Zone Workload ────────────────────────────────────────────────────────────
export const zoneWorkload = [
  { zone: 'Zone A', pickers: 3, activeOrders: 4, utilization: 78, avgPickTime: '3m 20s' },
  { zone: 'Zone B', pickers: 2, activeOrders: 5, utilization: 91, avgPickTime: '4m 45s' },
  { zone: 'Zone C', pickers: 1, activeOrders: 2, utilization: 64, avgPickTime: '3m 55s' },
  { zone: 'Zone D', pickers: 1, activeOrders: 1, utilization: 45, avgPickTime: '5m 10s' },
];

// ─── KPI Summary ──────────────────────────────────────────────────────────────
export const kpiSummary = {
  totalOrders: 247,
  ordersProcessing: 18,
  inventoryValue: 184320,
  fulfillmentRate: 96.8,
  warehouseUtilization: 74,
  activePickers: 7,
  ordersToday: 92,
  fulfilledToday: 89,
  pendingOrders: 14,
  delayedOrders: 3,
  avgFulfillmentTime: '2h 18m',
  totalExceptions: 6,
};

// ─── Allocation Data ──────────────────────────────────────────────────────────
export const allocationStats = {
  totalWaiting: 14,
  autoAllocated: 8,
  manualRequired: 3,
  efficiency: 94.2,
};

export const aiRecommendations = [
  { id: 'R1', text: 'Move 120 units of Wireless Headphones from Zone B to Zone A to reduce average picking distance by 18%.', impact: 'High', saving: '18% distance reduction' },
  { id: 'R2', text: 'Reassign picker James R. from Zone C to Zone B to reduce queue overload by ~35%.', impact: 'High', saving: '35% queue reduction' },
  { id: 'R3', text: 'Consolidate USB-C Cable inventory from Zone C shelf C-12 and C-14 to single location C-10 to improve picking speed.', impact: 'Medium', saving: '12% time saving' },
];
