import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Product name', required: false })
  name?: string;

  @ApiProperty({ description: 'Product description', required: false })
  description?: string;

  @ApiProperty({ description: 'Product price', required: false })
  price?: number;

  @ApiProperty({ description: 'Available quantity', required: false })
  quantity?: number;

  @ApiProperty({
    description: 'Inventory status',
    enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
    required: false,
  })
  inventoryStatus?: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

  @ApiProperty({ description: 'Product rating', required: false })
  rating?: number;
}
