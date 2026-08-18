from fastapi import APIRouter

router = APIRouter()

KPI_SUMMARY = {
    "totalOrders": 247,
    "ordersProcessing": 18,
    "inventoryValue": 184320,
    "fulfillmentRate": 96.8,
    "warehouseUtilization": 74,
    "activePickers": 7,
    "ordersToday": 92,
    "fulfilledToday": 89,
    "pendingOrders": 14,
    "delayedOrders": 3,
    "avgFulfillmentTime": "2h 18m",
    "totalExceptions": 6
}

@router.get('/kpi')
async def get_kpis():
    return KPI_SUMMARY
