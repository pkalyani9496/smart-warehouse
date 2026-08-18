# WarehouseAI – Smart Warehouse Management & Operations Platform

An enterprise-grade, AI-powered Smart Warehouse Management and Operations Console built with React 19, TypeScript, Vite, and Recharts.

---

## 🚀 Key Modules

- **🏠 Command Center / Dashboard**: Real-time warehouse metrics, operations overview, live activity timeline, and critical alerts.
- **📦 Inventory**: Real product catalog with high-resolution photography, stock statuses, SKU lookup, zone filters, and unit pricing in Indian Rupees (₹).
- **🛒 Orders**: Live order tracking with pick progress indicators, lifecycle statuses, priority ratings, and values in ₹.
- **✨ Smart Allocation**: AI-driven stock allocation recommendations, zone workload analysis, and automated queueing.
- **🔄 Picking & Packing**: Multi-step warehouse workflow (`Received` → `Picking` → `Quality Check` → `Packing` → `Dispatch`), picker assignments, and live packing station monitoring (Stations P-01 to P-06).
- **🚚 Fulfillment**: End-to-end order pipeline visualization and fulfillment performance trends.
- **⚠️ Exceptions & Bottlenecks**: Priority-filtered operational anomaly detection with instant resolution workflows.
- **📊 Analytics & BI**: Business intelligence dashboard featuring 6 interactive charts (Line, Bar, Horizontal Bar, Radar).
- **🎛️ What-If Simulator**: Scenario planning engine to forecast fulfillment rates, processing delays, and cost impacts.
- **⚙️ Settings**: Warehouse configurations, inventory safety thresholds, automation toggles, and performance goals.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Data Visualization**: Recharts
- **Styling**: Pure Modern CSS Design System (Dark navy sidebar, purple/indigo accents, responsive card grid)

---

## 📦 Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd warehouseai/frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
