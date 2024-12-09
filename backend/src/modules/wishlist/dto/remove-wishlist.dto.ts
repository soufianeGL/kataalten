import { ApiProperty } from '@nestjs/swagger';

export class RemoveFromWishlistDto {
  @ApiProperty({ description: 'ID of the product to remove from wishlist' })
  productId: string;
}
