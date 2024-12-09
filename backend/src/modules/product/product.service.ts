import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(createProductDto);
  }

  async findAll(
    page: number,
    limit: number,
    category: string,
  ): Promise<Product[]> {
    return this.productRepository.findAll(page, limit, category);
  }

  async findOne(productId: string): Promise<Product | null> {
    return this.productRepository.findById(productId);
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productRepository.update(productId, updateProductDto);
  }

  async findByCode(code: string): Promise<Product | null> {
    return this.productRepository.findByCode(code);
  }

  async delete(productId: string): Promise<void> {
    await this.productRepository.delete(productId);
  }
}
