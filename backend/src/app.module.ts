import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartService } from './modules/cart/cart.service';
import { WishlistService } from './modules/wishlist/wishlist.service';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { CartModule } from './modules/cart/cart.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { SeedService } from './seed/seed';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/kataalten'),
    ProductModule,
    AuthModule,
    WishlistModule,
    CartModule,
  ],
  providers: [CartService, WishlistService, SeedService],
})
export class AppModule {}
