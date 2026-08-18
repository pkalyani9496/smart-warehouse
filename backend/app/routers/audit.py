from fastapi import APIRouter

router = APIRouter()

AUDIT_LOG = [
    {"id": "AL-001", "action": "Order Created", "entity": "SW-1042", "user": "system", "timestamp": "2026-08-18 08:00"},
    {"id": "AL-002", "action": "Stock Allocated", "entity": "WH-4502", "user": "system", "timestamp": "2026-08-18 08:01"},
    {"id": "AL-003", "action": "Picker Assigned", "entity": "SW-1042", "user": "Alex M.", "timestamp": "2026-08-18 09:30"},
    {"id": "AL-004", "action": "Order Dispatched", "entity": "SW-1049", "user": "Priya K.", "timestamp": "2026-08-18 11:00"},
    {"id": "AL-005", "action": "Exception Resolved", "entity": "EX-007", "user": "admin", "timestamp": "2026-08-18 11:45"},
]

@router.get('/')
async def get_audit_log():
    return AUDIT_LOG
