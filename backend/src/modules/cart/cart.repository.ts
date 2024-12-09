import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Cart } from './cart.model';

@Injectable()
export class CartRepository {
  constructor(
    @InjectModel(Cart) private readonly cartModel: ReturnModelType<typeof Cart>,
  ) {}

  async findByUser(userId: string): Promise<Cart | null> {
    return this.cartModel.findOne({ userId }).populate('items.product').exec();
  }

  async addItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    return this.cartModel
      .findOneAndUpdate(
        { userId },
        { $push: { items: { product: productId, quantity } } },
        { upsert: true, new: true },
      )
      .populate('items.product')
      .exec();
  }

  async removeItem(userId: string, itemId: string): Promise<Cart | null> {
    return this.cartModel
      .findOneAndUpdate(
        { userId },
        { $pull: { items: { _id: itemId } } },
        { new: true },
      )
      .populate('items.product')
      .exec();
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartModel.findOneAndUpdate({ userId }, { items: [] }).exec();
  }
}
