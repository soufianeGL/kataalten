import { Test, TestingModule } from '@nestjs/testing';
import { Wishlist } from './wishlist.model';
import { WishlistRepository } from './wishlist.repository';
import { WishlistService } from './wishlist.service';

describe('WishlistService', () => {
  let service: WishlistService;
  let repository: WishlistRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistService,
        {
          provide: WishlistRepository,
          useValue: {
            findByUser: jest.fn(),
            addProduct: jest.fn(),
            removeProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
    repository = module.get<WishlistRepository>(WishlistRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a wishlist by user ID', async () => {
    const wishlist: Wishlist = {
      userId: '12345',
      products: ['Product001' as any, 'Product002' as any],
    };
    jest.spyOn(repository, 'findByUser').mockResolvedValue(wishlist);

    expect(await service.findByUser('12345')).toEqual(wishlist);
    expect(repository.findByUser).toHaveBeenCalledWith('12345');
  });

  it('should add a product to the wishlist', async () => {
    const updatedWishlist: Wishlist = {
      userId: '12345',
      products: ['Product001' as any, 'Product002' as any, 'Product003' as any],
    };
    jest.spyOn(repository, 'addProduct').mockResolvedValue(updatedWishlist);

    expect(await service.addProduct('12345', 'Product003')).toEqual(
      updatedWishlist,
    );
    expect(repository.addProduct).toHaveBeenCalledWith('12345', 'Product003');
  });

  it('should remove a product from the wishlist', async () => {
    const updatedWishlist: Wishlist = {
      userId: '12345',
      products: ['Product001' as any],
    };
    jest.spyOn(repository, 'removeProduct').mockResolvedValue(updatedWishlist);

    expect(await service.removeProduct('12345', 'Product002')).toEqual(
      updatedWishlist,
    );
    expect(repository.removeProduct).toHaveBeenCalledWith(
      '12345',
      'Product002',
    );
  });
});
