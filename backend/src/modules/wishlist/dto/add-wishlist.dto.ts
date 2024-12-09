import { ApiProperty } from '@nestjs/swagger';

export class AddToWishlistDto {
  @ApiProperty({ description: 'ID of the product to add to wishlist' })
  productId: string;
}
