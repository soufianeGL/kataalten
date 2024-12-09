import { ApiProperty } from '@nestjs/swagger';

export class RemoveItemDto {
  @ApiProperty({ description: 'ID of the cart item to remove' })
  itemId: string;
}
