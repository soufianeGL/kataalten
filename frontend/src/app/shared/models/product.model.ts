export interface Product {
    _id: string;
    code: string;
    name: string;
    description?: string;
    image?: string;
    category: string;
    price: number;
    quantity: number;
    inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
    rating?: number;
  }