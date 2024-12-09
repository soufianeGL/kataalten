import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Product } from './product.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) {}

  async findAll(page, limit, category): Promise<Product[]> {
    const query = category ? { category } : {};
    return this.productModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findById(productId: string): Promise<Product | null> {
    return this.productModel.findById(productId).exec();
  }

  async findByCode(code: string): Promise<Product | null> {
    return this.productModel.findOne({ code }).exec();
  }

  async create(productData: Partial<Product>): Promise<Product> {
    return this.productModel.create(productData);
  }

  async update(
    productId: string,
    updateData: Partial<Product>,
  ): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(productId, updateData, { new: true })
      .exec();
  }

  async delete(productId: string): Promise<void> {
    await this.productModel.findByIdAndDelete(productId).exec();
  }
}
