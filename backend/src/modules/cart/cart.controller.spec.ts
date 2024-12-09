import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { Cart } from './cart.model';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            findByUser: jest.fn(),
            addItem: jest.fn(),
            removeItem: jest.fn(),
            clearCart: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should retrieve a cart by user ID', async () => {
    const cart = { userId: '12345', items: [] };
    jest.spyOn(service, 'findByUser').mockResolvedValue(cart);

    expect(await controller.findByUser('12345')).toEqual(cart);
    expect(service.findByUser).toHaveBeenCalledWith('12345');
  });

  it('should add an item to the cart', async () => {
    const dto: AddItemDto = { productId: 'P001', quantity: 2 };
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
    jest.spyOn(service, 'addItem').mockResolvedValue(updatedCart);

    expect(await controller.addItem('12345', dto)).toEqual(updatedCart);
    expect(service.addItem).toHaveBeenCalledWith(
      '12345',
      dto.productId,
      dto.quantity,
    );
  });
});
