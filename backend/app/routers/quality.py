from fastapi import APIRouter

router = APIRouter()

@router.get('/checks')
async def list_quality_checks():
    return [
        {"orderId": "SW-1044", "status": "Passed", "inspector": "Sara P.", "timestamp": "11:20 AM"},
        {"orderId": "SW-1049", "status": "Passed", "inspector": "Sara P.", "timestamp": "10:45 AM"},
    ]
