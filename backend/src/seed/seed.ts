import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly productService: ProductService) {}

  async onModuleInit() {
    const products = [
      {
        code: 'P001',
        name: 'Laptop',
        description: 'High-end laptop',
        category: 'Electronics',
        price: 1200,
        quantity: 10,
        inventoryStatus: 'INSTOCK',
        rating: 4.5,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P002',
        name: 'Smartphone',
        description: 'Latest smartphone',
        category: 'Electronics',
        price: 800,
        quantity: 20,
        inventoryStatus: 'INSTOCK',
        rating: 4.8,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P003',
        name: 'Tablet',
        description: 'Powerful tablet',
        category: 'Electronics',
        price: 600,
        quantity: 15,
        inventoryStatus: 'INSTOCK',
        rating: 4.3,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P004',
        name: 'Headphones',
        description: 'Noise-cancelling headphones',
        category: 'Accessories',
        price: 200,
        quantity: 50,
        inventoryStatus: 'INSTOCK',
        rating: 4.7,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P005',
        name: 'Smart Watch',
        description: 'Feature-packed smartwatch',
        category: 'Accessories',
        price: 250,
        quantity: 30,
        inventoryStatus: 'INSTOCK',
        rating: 4.6,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P006',
        name: 'Camera',
        description: 'High-resolution camera',
        category: 'Photography',
        price: 1000,
        quantity: 8,
        inventoryStatus: 'LOWSTOCK',
        rating: 4.9,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P007',
        name: 'Gaming Console',
        description: 'Next-gen gaming console',
        category: 'Gaming',
        price: 500,
        quantity: 12,
        inventoryStatus: 'INSTOCK',
        rating: 4.4,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P008',
        name: 'Keyboard',
        description: 'Mechanical keyboard',
        category: 'Accessories',
        price: 100,
        quantity: 40,
        inventoryStatus: 'INSTOCK',
        rating: 4.2,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P009',
        name: 'Monitor',
        description: '4K monitor',
        category: 'Electronics',
        price: 400,
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 4.8,
        image: 'https://via.placeholder.com/150',
      },
      {
        code: 'P010',
        name: 'Mouse',
        description: 'Ergonomic wireless mouse',
        category: 'Accessories',
        price: 50,
        quantity: 60,
        inventoryStatus: 'INSTOCK',
        rating: 4.1,
        image: 'https://via.placeholder.com/150',
      },
    ];

    for (const product of products) {
      const exists = await this.productService.findByCode(product.code);
      if (!exists) {
        await this.productService.create(product);
        console.log(`product ${product.code} has been added`);
      }
    }
  }
}
