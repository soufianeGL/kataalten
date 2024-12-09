import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Unique code for the product' })
  code: string;

  @ApiProperty({ description: 'Name of the product' })
  name: string;

  @ApiProperty({ description: 'Description of the product', required: false })
  description?: string;

  @ApiProperty({ description: 'URL for product image', required: false })
  image?: string;

  @ApiProperty({ description: 'Category of the product' })
  category: string;

  @ApiProperty({ description: 'Price of the product' })
  price: number;

  @ApiProperty({ description: 'Available quantity' })
  quantity: number;

  @ApiProperty({
    description: 'Inventory status',
    enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
  })
  inventoryStatus?: string;

  @ApiProperty({ description: 'Product rating', required: false })
  rating?: number;
}
