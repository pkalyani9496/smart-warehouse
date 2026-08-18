from fastapi import APIRouter

router = APIRouter()

ZONE_WORKLOAD = [
    {"zone": "Zone A", "pickers": 3, "activeOrders": 4, "utilization": 78, "avgPickTime": "3m 20s"},
    {"zone": "Zone B", "pickers": 2, "activeOrders": 5, "utilization": 91, "avgPickTime": "4m 45s"},
    {"zone": "Zone C", "pickers": 1, "activeOrders": 2, "utilization": 64, "avgPickTime": "3m 55s"},
    {"zone": "Zone D", "pickers": 1, "activeOrders": 1, "utilization": 45, "avgPickTime": "5m 10s"},
]

@router.get('/workload')
async def get_zone_workload():
    return ZONE_WORKLOAD
