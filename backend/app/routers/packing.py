from fastapi import APIRouter

router = APIRouter()

PACKING_STATIONS = [
    {"id": "P-01", "status": "Active", "currentOrder": "SW-1042", "operator": "Alex M.", "items": 6, "progress": 80, "avgTime": "4m 20s"},
    {"id": "P-02", "status": "Active", "currentOrder": "SW-1044", "operator": "Sara P.", "items": 2, "progress": 95, "avgTime": "3m 10s"},
    {"id": "P-03", "status": "Delayed", "currentOrder": "SW-1048", "operator": "James R.", "items": 1, "progress": 30, "avgTime": "7m 50s"},
    {"id": "P-04", "status": "Available", "currentOrder": None, "operator": "—", "items": 0, "progress": 0, "avgTime": "—"},
    {"id": "P-05", "status": "Maintenance", "currentOrder": None, "operator": "—", "items": 0, "progress": 0, "avgTime": "—"},
    {"id": "P-06", "status": "Available", "currentOrder": None, "operator": "—", "items": 0, "progress": 0, "avgTime": "—"},
]

@router.get('/stations')
async def get_packing_stations():
    return PACKING_STATIONS
