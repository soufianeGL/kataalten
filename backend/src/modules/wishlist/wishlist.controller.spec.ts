import { Test, TestingModule } from '@nestjs/testing';
import { AddToWishlistDto } from './dto/add-wishlist.dto';
import { RemoveFromWishlistDto } from './dto/remove-wishlist.dto';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './wishlist.model';

describe('WishlistController', () => {
  let controller: WishlistController;
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [
        {
          provide: WishlistService,
          useValue: {
            findByUser: jest.fn(),
            addProduct: jest.fn(),
            removeProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WishlistController>(WishlistController);
    service = module.get<WishlistService>(WishlistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should retrieve a wishlist by user ID', async () => {
    const wishlist = { userId: '12345', products: [] };
    jest.spyOn(service, 'findByUser').mockResolvedValue(wishlist);

    expect(await controller.findByUser('12345')).toEqual(wishlist);
    expect(service.findByUser).toHaveBeenCalledWith('12345');
  });

  it('should add a product to the wishlist', async () => {
    const dto: AddToWishlistDto = { productId: 'P001' };
    const updatedWishlist: Wishlist = {
      userId: '12345',
      products: ['Product001' as any, 'Product002' as any, 'Product003' as any],
    };
    jest.spyOn(service, 'addProduct').mockResolvedValue(updatedWishlist);

    expect(await controller.addProduct('12345', dto)).toEqual(updatedWishlist);
    expect(service.addProduct).toHaveBeenCalledWith('12345', dto.productId);
  });

  it('should remove a product from the wishlist', async () => {
    const dto: RemoveFromWishlistDto = { productId: 'P001' };
    const updatedWishlist: Wishlist = {
      userId: '12345',
      products: ['Product001' as any, 'Product002' as any, 'Product003' as any],
    };
    jest.spyOn(service, 'removeProduct').mockResolvedValue(updatedWishlist);

    expect(await controller.removeProduct('12345', dto)).toEqual(
      updatedWishlist,
    );
    expect(service.removeProduct).toHaveBeenCalledWith('12345', dto.productId);
  });
});
