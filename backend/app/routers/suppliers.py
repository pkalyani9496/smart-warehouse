from fastapi import APIRouter

router = APIRouter()

SUPPLIERS_DB = [
    {"id": "SUP-01", "name": "AudioTech Global", "category": "Electronics", "rating": 4.8, "status": "Active"},
    {"id": "SUP-02", "name": "ErgoWorks Industrial", "category": "Furniture", "rating": 4.6, "status": "Active"},
    {"id": "SUP-03", "name": "SiliconGear Components", "category": "Cables & Accessories", "rating": 4.9, "status": "Active"},
]

@router.get('/')
async def list_suppliers():
    return SUPPLIERS_DB
