import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { RemoveItemDto } from './dto/remove--item.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async findByUser(@Param('userId') userId: string) {
    return this.cartService.findByUser(userId);
  }

  @Post(':userId/add')
  async addItem(
    @Param('userId') userId: string,
    @Body() addItemDto: AddItemDto,
  ) {
    return this.cartService.addItem(
      userId,
      addItemDto.productId,
      addItemDto.quantity,
    );
  }

  @Post(':userId/remove')
  async removeItem(
    @Param('userId') userId: string,
    @Body() removeItemDto: RemoveItemDto,
  ) {
    return this.cartService.removeItem(userId, removeItemDto.itemId);
  }

  @Delete(':userId/clear')
  async clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
