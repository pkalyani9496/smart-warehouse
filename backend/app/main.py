from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, users, suppliers, products, inventory, orders, allocations, picking, packing, quality, dispatch, exceptions, analytics, audit

app = FastAPI(title='SmartFulfill Warehouse Management', version='0.1.0')

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Include routers
app.include_router(auth.router, prefix='/api/auth', tags=['auth'])
app.include_router(users.router, prefix='/api/users', tags=['users'])
app.include_router(suppliers.router, prefix='/api/suppliers', tags=['suppliers'])
app.include_router(products.router, prefix='/api/products', tags=['products'])
app.include_router(inventory.router, prefix='/api/inventory', tags=['inventory'])
app.include_router(orders.router, prefix='/api/orders', tags=['orders'])
app.include_router(allocations.router, prefix='/api/allocations', tags=['allocations'])
app.include_router(picking.router, prefix='/api/picking', tags=['picking'])
app.include_router(packing.router, prefix='/api/packing', tags=['packing'])
app.include_router(quality.router, prefix='/api/quality', tags=['quality'])
app.include_router(dispatch.router, prefix='/api/dispatch', tags=['dispatch'])
app.include_router(exceptions.router, prefix='/api/exceptions', tags=['exceptions'])
app.include_router(analytics.router, prefix='/api/analytics', tags=['analytics'])
app.include_router(audit.router, prefix='/api/audit', tags=['audit'])

@app.get('/')
async def root():
    return {'message': 'SmartFulfill API is running'}
