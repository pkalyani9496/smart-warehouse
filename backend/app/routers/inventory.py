from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class Product(BaseModel):
    id: str
    name: str
    sku: str
    category: str
    currentStock: int
    reservedStock: int
    availableStock: int
    reorderLevel: int
    zone: str
    status: str
    imageUrl: str
    unitPrice: float

PRODUCTS_DB = [
    Product(id='P001', name='Wireless Headphones', sku='WH-4502', category='Electronics', currentStock=248, reservedStock=120, availableStock=128, reorderLevel=50, zone='A', status='In Stock', imageUrl='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80', unitPrice=7499.00),
    Product(id='P002', name='Laptop Stand', sku='LS-2210', category='Accessories', currentStock=45, reservedStock=30, availableStock=15, reorderLevel=20, zone='B', status='Low Stock', imageUrl='https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=200&q=80', unitPrice=2899.00),
    Product(id='P003', name='Mechanical Keyboard', sku='MK-7701', category='Electronics', currentStock=182, reservedStock=60, availableStock=122, reorderLevel=40, zone='A', status='In Stock', imageUrl='https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80', unitPrice=10799.00),
    Product(id='P004', name='USB-C Cable (2m)', sku='UC-3301', category='Cables', currentStock=12, reservedStock=10, availableStock=2, reorderLevel=30, zone='C', status='Critical', imageUrl='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80', unitPrice=1099.00),
    Product(id='P005', name='Smart Watch', sku='SW-8801', category='Wearables', currentStock=97, reservedStock=45, availableStock=52, reorderLevel=25, zone='B', status='In Stock', imageUrl='https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80', unitPrice=20799.00),
    Product(id='P006', name='Bluetooth Speaker', sku='BS-5502', category='Electronics', currentStock=0, reservedStock=0, availableStock=0, reorderLevel=20, zone='D', status='Out of Stock', imageUrl='https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=200&q=80', unitPrice=4999.00),
    Product(id='P007', name='Wireless Mouse', sku='WM-1102', category='Accessories', currentStock=310, reservedStock=80, availableStock=230, reorderLevel=60, zone='A', status='In Stock', imageUrl='https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80', unitPrice=3299.00),
    Product(id='P008', name='Ergonomic Chair', sku='EC-9901', category='Furniture', currentStock=22, reservedStock=8, availableStock=14, reorderLevel=10, zone='D', status='Low Stock', imageUrl='https://images.unsplash.com/photo-1580481077195-c228c388789f?auto=format&fit=crop&w=200&q=80', unitPrice=33199.00),
    Product(id='P009', name='4K Monitor', sku='MN-6601', category='Electronics', currentStock=67, reservedStock=20, availableStock=47, reorderLevel=15, zone='C', status='In Stock', imageUrl='https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80', unitPrice=37349.00),
    Product(id='P010', name='Gaming Headset', sku='GH-3302', category='Gaming', currentStock=138, reservedStock=55, availableStock=83, reorderLevel=30, zone='B', status='In Stock', imageUrl='https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=200&q=80', unitPrice=6639.00),
]

@router.get('/', response_model=List[Product])
async def get_inventory(zone: Optional[str] = None, search: Optional[str] = None):
    results = PRODUCTS_DB
    if zone and zone != 'All':
        results = [p for p in results if p.zone == zone]
    if search:
        s = search.lower()
        results = [p for p in results if s in p.name.lower() or s in p.sku.lower()]
    return results

@router.get('/{product_id}', response_model=Product)
async def get_product_by_id(product_id: str):
    for p in PRODUCTS_DB:
        if p.id == product_id or p.sku == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")

@router.post('/reorder/{product_id}')
async def reorder_stock(product_id: str, quantity: int = 100):
    for p in PRODUCTS_DB:
        if p.id == product_id or p.sku == product_id:
            p.currentStock += quantity
            p.availableStock += quantity
            p.status = 'In Stock' if p.availableStock > p.reorderLevel else 'Low Stock'
            return {"message": f"Reordered {quantity} units for {p.name}", "product": p}
    raise HTTPException(status_code=404, detail="Product not found")
