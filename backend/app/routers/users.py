from fastapi import APIRouter

router = APIRouter()

USERS_DB = [
    {"id": "U1", "name": "Alex M.", "role": "Picker & Packer", "status": "Active", "shift": "Morning"},
    {"id": "U2", "name": "Sara P.", "role": "Quality Inspector", "status": "Active", "shift": "Morning"},
    {"id": "U3", "name": "James R.", "role": "Picker", "status": "Active", "shift": "Morning"},
    {"id": "U4", "name": "Priya K.", "role": "Dispatch Coordinator", "status": "Active", "shift": "Morning"},
]

@router.get('/')
async def list_users():
    return USERS_DB
