import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Cart } from './cart.model';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';

@Module({
  imports: [TypegooseModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export class CartModule {}
