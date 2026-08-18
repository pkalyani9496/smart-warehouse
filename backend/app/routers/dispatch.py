from fastapi import APIRouter

router = APIRouter()

@router.get('/manifests')
async def list_dispatch_manifests():
    return [
        {"manifestId": "MF-902", "carrier": "ExpressLogistics", "packages": 12, "status": "In Transit", "departure": "11:30 AM"},
        {"manifestId": "MF-903", "carrier": "SpeedCourier", "packages": 8, "status": "Ready", "departure": "02:00 PM"},
    ]
