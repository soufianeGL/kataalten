import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { ApiTags } from '@nestjs/swagger';
import { AddToWishlistDto } from './dto/add-wishlist.dto';
import { RemoveFromWishlistDto } from './dto/remove-wishlist.dto';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get(':userId')
  async findByUser(@Param('userId') userId: string) {
    return this.wishlistService.findByUser(userId);
  }

  @Post(':userId/add')
  async addProduct(
    @Param('userId') userId: string,
    @Body() addToWishlistDto: AddToWishlistDto,
  ) {
    return this.wishlistService.addProduct(userId, addToWishlistDto.productId);
  }

  @Post(':userId/remove')
  async removeProduct(
    @Param('userId') userId: string,
    @Body() removeFromWishlistDto: RemoveFromWishlistDto,
  ) {
    return this.wishlistService.removeProduct(
      userId,
      removeFromWishlistDto.productId,
    );
  }
}
