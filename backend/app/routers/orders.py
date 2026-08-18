from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class Order(BaseModel):
    id: str
    customer: str
    product: str
    sku: str
    quantity: int
    zone: str
    priority: str
    status: str
    allocationStatus: str
    pickStatus: str
    picker: str
    pickProgress: int
    expectedDispatch: str
    itemCount: int
    fulfilledItems: int
    value: float

ORDERS_DB = [
    Order(id='SW-1042', customer='TechCorp Ltd', product='Wireless Headphones', sku='WH-4502', quantity=6, zone='A', priority='High', status='Picking', allocationStatus='Auto Allocated', pickStatus='In Progress', picker='Alex M.', pickProgress=67, expectedDispatch='2026-08-18 14:00', itemCount=6, fulfilledItems=4, value=44994.00),
    Order(id='SW-1043', customer='StartupXYZ', product='Mechanical Keyboard', sku='MK-7701', quantity=3, zone='A', priority='Medium', status='Processing', allocationStatus='Auto Allocated', pickStatus='Not Started', picker='—', pickProgress=0, expectedDispatch='2026-08-18 16:00', itemCount=3, fulfilledItems=0, value=32397.00),
    Order(id='SW-1044', customer='CloudBase Inc', product='Smart Watch', sku='SW-8801', quantity=2, zone='B', priority='Critical', status='Packing', allocationStatus='Reserved', pickStatus='Picked', picker='Sara P.', pickProgress=100, expectedDispatch='2026-08-18 13:30', itemCount=2, fulfilledItems=2, value=41598.00),
    Order(id='SW-1045', customer='Retail Hub', product='USB-C Cable (2m)', sku='UC-3301', quantity=20, zone='C', priority='High', status='Delayed', allocationStatus='Manual Review', pickStatus='Not Started', picker='—', pickProgress=0, expectedDispatch='2026-08-18 12:00', itemCount=20, fulfilledItems=0, value=21980.00),
    Order(id='SW-1046', customer='MediaStream', product='Wireless Mouse', sku='WM-1102', quantity=10, zone='A', priority='Low', status='Processing', allocationStatus='Auto Allocated', pickStatus='Not Started', picker='—', pickProgress=0, expectedDispatch='2026-08-19 09:00', itemCount=10, fulfilledItems=0, value=32990.00),
    Order(id='SW-1047', customer='GreenOffice', product='Laptop Stand', sku='LS-2210', quantity=5, zone='B', priority='Medium', status='Processing', allocationStatus='Waiting', pickStatus='Not Started', picker='—', pickProgress=0, expectedDispatch='2026-08-18 17:00', itemCount=5, fulfilledItems=0, value=14495.00),
    Order(id='SW-1048', customer='DevHouse', product='4K Monitor', sku='MN-6601', quantity=1, zone='C', priority='High', status='Picking', allocationStatus='Auto Allocated', pickStatus='In Progress', picker='James R.', pickProgress=45, expectedDispatch='2026-08-18 15:00', itemCount=1, fulfilledItems=0, value=37349.00),
    Order(id='SW-1049', customer='NexGen Co', product='Gaming Headset', sku='GH-3302', quantity=4, zone='B', priority='Low', status='Dispatched', allocationStatus='Auto Allocated', pickStatus='Picked', picker='Priya K.', pickProgress=100, expectedDispatch='2026-08-18 11:00', itemCount=4, fulfilledItems=4, value=26556.00),
    Order(id='SW-1050', customer='FutureTech', product='Ergonomic Chair', sku='EC-9901', quantity=2, zone='D', priority='Medium', status='Delivered', allocationStatus='Auto Allocated', pickStatus='Picked', picker='Tom B.', pickProgress=100, expectedDispatch='2026-08-17 16:00', itemCount=2, fulfilledItems=2, value=66398.00),
    Order(id='SW-1051', customer='ByteWorks', product='Wireless Headphones', sku='WH-4502', quantity=8, zone='A', priority='Critical', status='Processing', allocationStatus='Manual Review', pickStatus='Not Started', picker='—', pickProgress=0, expectedDispatch='2026-08-18 13:00', itemCount=8, fulfilledItems=0, value=59992.00),
]

@router.get('/', response_model=List[Order])
async def get_orders(status: Optional[str] = None):
    if status and status != 'All':
        return [o for o in ORDERS_DB if o.status.lower() == status.lower()]
    return ORDERS_DB

@router.get('/{order_id}', response_model=Order)
async def get_order_by_id(order_id: str):
    for o in ORDERS_DB:
        if o.id == order_id:
            return o
    raise HTTPException(status_code=404, detail="Order not found")

@router.patch('/{order_id}/status')
async def update_order_status(order_id: str, status: str):
    for o in ORDERS_DB:
        if o.id == order_id:
            o.status = status
            return {"message": f"Order {order_id} status updated to {status}", "order": o}
    raise HTTPException(status_code=404, detail="Order not found")
