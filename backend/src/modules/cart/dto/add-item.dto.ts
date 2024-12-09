import { ApiProperty } from '@nestjs/swagger';

export class AddItemDto {
  @ApiProperty({ description: 'ID of the product to add' })
  productId: string;

  @ApiProperty({ description: 'Quantity of the product to add' })
  quantity: number;
}
