from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class WarehouseException(BaseModel):
    id: str
    severity: str
    title: str
    description: str
    zone: str
    affectedOrders: List[str]
    detectedAt: str
    recommendedAction: str
    resolved: bool

EXCEPTIONS_DB = [
    WarehouseException(id='EX-001', severity='Critical', title='Stock Below Safety Threshold', description='Wireless Headphones (WH-4502) stock is critically low. Only 128 units available against reserved 120.', zone='Zone A', affectedOrders=['SW-1042', 'SW-1051'], detectedAt='10:32 AM', recommendedAction='Initiate emergency reorder for 200+ units immediately.', resolved=False),
    WarehouseException(id='EX-002', severity='Critical', title='Out of Stock – Bluetooth Speaker', description='Bluetooth Speaker (BS-5502) is completely out of stock. Cannot fulfill pending orders.', zone='Zone D', affectedOrders=[], detectedAt='09:15 AM', recommendedAction='Contact supplier for emergency restock. Update order status to Delayed.', resolved=False),
    WarehouseException(id='EX-003', severity='High', title='Zone B Picking Queue Overloaded', description='Zone B picking workload is 24% above average capacity. 3 orders are queued with no assigned picker.', zone='Zone B', affectedOrders=['SW-1047', 'SW-1049'], detectedAt='10:44 AM', recommendedAction='Reassign 1 picker from Zone D to Zone B immediately.', resolved=False),
    WarehouseException(id='EX-004', severity='High', title='Order SW-1045 Significantly Delayed', description='Order SW-1045 for Retail Hub was due at 12:00. USB-C Cables are critically low (2 units, 20 needed).', zone='Zone C', affectedOrders=['SW-1045'], detectedAt='12:01 PM', recommendedAction='Notify customer of delay. Source from alternate supplier.', resolved=False),
    WarehouseException(id='EX-005', severity='Medium', title='Packing Station P-03 Underperforming', description='Station P-03 is operating 15% slower than average. Current order SW-1048 has been in packing for 22 minutes.', zone='Zone C', affectedOrders=['SW-1048'], detectedAt='10:55 AM', recommendedAction='Inspect P-03 for equipment issues. Consider reassigning order.', resolved=False),
    WarehouseException(id='EX-006', severity='Medium', title='Low Stock – Laptop Stand', description='Laptop Stand (LS-2210) has only 15 units available with 30 reserved. Reorder level is 20.', zone='Zone B', affectedOrders=['SW-1047'], detectedAt='11:20 AM', recommendedAction='Place reorder for 100 units. ETA 3–5 business days.', resolved=False),
    WarehouseException(id='EX-007', severity='Low', title='USB-C Cable Reorder Overdue', description='USB-C Cable reorder was scheduled 3 days ago but not confirmed. Stock now at critical level.', zone='Zone C', affectedOrders=['SW-1045'], detectedAt='08:00 AM', recommendedAction='Contact procurement team to confirm PO status.', resolved=True),
]

@router.get('/', response_model=List[WarehouseException])
async def get_exceptions():
    return EXCEPTIONS_DB

@router.post('/{exception_id}/resolve')
async def resolve_exception(exception_id: str):
    for ex in EXCEPTIONS_DB:
        if ex.id == exception_id:
            ex.resolved = True
            return {"message": f"Exception {exception_id} resolved", "exception": ex}
    raise HTTPException(status_code=404, detail="Exception not found")
