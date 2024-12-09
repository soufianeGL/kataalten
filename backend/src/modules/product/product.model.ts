import { prop } from '@typegoose/typegoose';

export class Product {
  @prop({ required: true })
  code: string;

  @prop({ required: true })
  name: string;

  @prop()
  description?: string;

  @prop()
  image?: string;

  @prop({ required: true })
  category: string;

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  quantity: number;

  @prop({ enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'], default: 'INSTOCK' })
  inventoryStatus: string;

  @prop()
  rating?: number;
}
