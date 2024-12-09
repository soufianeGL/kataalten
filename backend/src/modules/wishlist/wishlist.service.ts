import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from './wishlist.model';

@Injectable()
export class WishlistService {
  constructor(private readonly wishlistRepository: WishlistRepository) {}

  async findByUser(userId: string): Promise<Wishlist | null> {
    return this.wishlistRepository.findByUser(userId);
  }

  async addProduct(userId: string, productId: string): Promise<Wishlist> {
    return this.wishlistRepository.addProduct(userId, productId);
  }

  async removeProduct(
    userId: string,
    productId: string,
  ): Promise<Wishlist | null> {
    return this.wishlistRepository.removeProduct(userId, productId);
  }
}
