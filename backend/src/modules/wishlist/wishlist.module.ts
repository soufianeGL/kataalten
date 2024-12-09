import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { WishlistRepository } from './wishlist.repository';

@Module({
  imports: [TypegooseModule.forFeature([Wishlist])],
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository],
  exports: [WishlistService, WishlistRepository],
})
export class WishlistModule {}
