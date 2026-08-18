from fastapi import APIRouter
from .inventory import PRODUCTS_DB, Product
from typing import List

router = APIRouter()

@router.get('/', response_model=List[Product])
async def list_products():
    return PRODUCTS_DB
