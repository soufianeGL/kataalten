import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './product.model';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const products: Product[] = [
      {
        code: 'P001',
        name: 'Test Product',
        description: 'A test product',
        image: 'http://example.com/image.jpg',
        category: 'TestCategory',
        price: 100,
        quantity: 10,
        inventoryStatus: 'INSTOCK',
        rating: 4.5,
      },
    ];
    jest.spyOn(repository, 'findAll').mockResolvedValue(products);

    expect(await service.findAll()).toEqual(products);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should return a product by ID', async () => {
    const product: Product = {
      code: 'P002',
      name: 'Another Product',
      description: 'Another test product',
      image: 'http://example.com/image2.jpg',
      category: 'AnotherCategory',
      price: 200,
      quantity: 5,
      inventoryStatus: 'LOWSTOCK',
      rating: 3.5,
    };
    jest.spyOn(repository, 'findById').mockResolvedValue(product);

    expect(await service.findOne('P002')).toEqual(product);
    expect(repository.findById).toHaveBeenCalledWith('P002');
  });
});
