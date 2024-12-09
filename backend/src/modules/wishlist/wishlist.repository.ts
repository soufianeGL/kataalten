import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Wishlist } from './wishlist.model';

@Injectable()
export class WishlistRepository {
  constructor(
    @InjectModel(Wishlist)
    private readonly wishlistModel: ReturnModelType<typeof Wishlist>,
  ) {}

  async findByUser(userId: string): Promise<Wishlist | null> {
    return this.wishlistModel.findOne({ userId }).populate('products').exec();
  }

  async addProduct(userId: string, productId: string): Promise<Wishlist> {
    return this.wishlistModel
      .findOneAndUpdate(
        { userId },
        { $addToSet: { products: productId } },
        { upsert: true, new: true },
      )
      .populate('products')
      .exec();
  }

  async removeProduct(
    userId: string,
    productId: string,
  ): Promise<Wishlist | null> {
    return this.wishlistModel
      .findOneAndUpdate(
        { userId },
        { $pull: { products: productId } },
        { new: true },
      )
      .populate('products')
      .exec();
  }
}
