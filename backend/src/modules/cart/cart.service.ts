import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { Cart } from './cart.model';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async findByUser(userId: string): Promise<Cart | null> {
    return this.cartRepository.findByUser(userId);
  }

  async addItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    return this.cartRepository.addItem(userId, productId, quantity);
  }

  async removeItem(userId: string, itemId: string): Promise<Cart | null> {
    return this.cartRepository.removeItem(userId, itemId);
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartRepository.clearCart(userId);
  }
}
