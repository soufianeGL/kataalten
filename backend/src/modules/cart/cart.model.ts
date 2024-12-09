import { prop, Ref } from '@typegoose/typegoose';
import { Product } from '../product/product.model';

class CartItem {
  @prop({ required: true, ref: () => Product })
  product: Ref<Product>;

  @prop({ required: true })
  quantity: number;
}

export class Cart {
  @prop({ required: true })
  userId: string;

  @prop({ type: () => [CartItem], default: [] })
  items: CartItem[];
}
