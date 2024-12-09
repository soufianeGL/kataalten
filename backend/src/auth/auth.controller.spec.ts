import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false,
      };
      const result = {
        id: '1',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'register').mockResolvedValue(result);

      expect(await controller.register(registerDto)).toEqual(result);
      expect(service.register).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
        false,
      );
    });
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const user = {
        id: '1',
        username: 'testUser',
        email: 'test@example.com',
        isAdmin: false,
      };
      const token = 'jwt-token';

      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      jest.spyOn(service, 'login').mockResolvedValue(token);

      expect(await controller.login(loginDto)).toEqual(token);
      expect(service.validateUser).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      );
      expect(service.login).toHaveBeenCalledWith(user);
    });

    it('should throw an UnauthorizedException for invalid credentials', async () => {
      const loginDto = {
        email: 'wrong@example.com',
        password: 'wrongPassword',
      };

      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(controller.login(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
      expect(service.validateUser).toHaveBeenCalledWith(
        'wrong@example.com',
        'wrongPassword',
      );
      expect(service.login).not.toHaveBeenCalled();
    });
  });
});
