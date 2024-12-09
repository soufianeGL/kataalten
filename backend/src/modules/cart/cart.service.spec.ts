import { Test, TestingModule } from '@nestjs/testing';
import { Cart } from './cart.model';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let repository: CartRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CartRepository,
          useValue: {
            findByUser: jest.fn(),
            addItem: jest.fn(),
            removeItem: jest.fn(),
            clearCart: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    repository = module.get<CartRepository>(CartRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a cart by user ID', async () => {
    const cart: Cart = {
      userId: '12345',
      items: [
        {
          product: 'Product001' as any,
          quantity: 2,
        },
      ],
    };
    jest.spyOn(repository, 'findByUser').mockResolvedValue(cart);

    expect(await service.findByUser('12345')).toEqual(cart);
    expect(repository.findByUser).toHaveBeenCalledWith('12345');
  });

  it('should add an item to the cart', async () => {
    const updatedCart: Cart = {
      userId: '12345',
      items: [
        {
          product: 'Product001' as any,
          quantity: 2,
        },
        {
          product: 'Product002' as any,
          quantity: 1,
        },
      ],
    };
    jest.spyOn(repository, 'addItem').mockResolvedValue(updatedCart);

    expect(await service.addItem('12345', 'Product002', 1)).toEqual(
      updatedCart,
    );
    expect(repository.addItem).toHaveBeenCalledWith('12345', 'Product002', 1);
  });

  it('should remove an item from the cart', async () => {
    const updatedCart: Cart = {
      userId: '12345',
      items: [
        {
          product: 'Product001' as any,
          quantity: 2,
        },
      ],
    };
    jest.spyOn(repository, 'removeItem').mockResolvedValue(updatedCart);

    expect(await service.removeItem('12345', 'Item001')).toEqual(updatedCart);
    expect(repository.removeItem).toHaveBeenCalledWith('12345', 'Item001');
  });

  it('should clear the cart', async () => {
    jest.spyOn(repository, 'clearCart').mockResolvedValue();

    await service.clearCart('12345');
    expect(repository.clearCart).toHaveBeenCalledWith('12345');
  });
});
