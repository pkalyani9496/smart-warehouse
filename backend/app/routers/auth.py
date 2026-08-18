from fastapi import APIRouter

router = APIRouter()

@router.get('/status')
async def auth_status():
    return {"authenticated": True, "user": "admin@smartwarehouse.ai", "role": "Operations Manager"}
