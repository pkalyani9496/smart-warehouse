from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

ALLOCATION_STATS = {
    "totalWaiting": 14,
    "autoAllocated": 8,
    "manualRequired": 3,
    "efficiency": 94.2
}

AI_RECOMMENDATIONS = [
    {"id": "R1", "text": "Move 120 units of Wireless Headphones from Zone B to Zone A to reduce average picking distance by 18%.", "impact": "High", "saving": "18% distance reduction"},
    {"id": "R2", "text": "Reassign picker James R. from Zone C to Zone B to reduce queue overload by ~35%.", "impact": "High", "saving": "35% queue reduction"},
    {"id": "R3", "text": "Consolidate USB-C Cable inventory from Zone C shelf C-12 and C-14 to single location C-10 to improve picking speed.", "impact": "Medium", "saving": "12% time saving"},
]

@router.get('/stats')
async def get_allocation_stats():
    return ALLOCATION_STATS

@router.get('/recommendations')
async def get_ai_recommendations():
    return AI_RECOMMENDATIONS
