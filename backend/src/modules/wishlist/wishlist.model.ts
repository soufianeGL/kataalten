import { prop, Ref } from '@typegoose/typegoose';
import { Product } from '../product/product.model';

export class Wishlist {
  @prop({ required: true })
  userId: string;

  @prop({ ref: () => Product, default: [] })
  products: Ref<Product>[];
}
