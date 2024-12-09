import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const spyHash = jest
      .spyOn(bcrypt, 'hash')
      .mockResolvedValue('hashedPassword');
    const user = await service.register(
      'testUser',
      'test@example.com',
      'password123',
    );
    expect(user).toEqual({
      id: expect.any(String),
      username: 'testUser',
      email: 'test@example.com',
    });
    expect(spyHash).toHaveBeenCalledWith('password123', 10);
  });

  it('should validate a user with correct credentials', async () => {
    await service.register('testUser', 'test@example.com', 'password123');
    const spyCompare = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    const user = await service.validateUser('test@example.com', 'password123');
    expect(user).toEqual({
      id: expect.any(String),
      username: 'testUser',
      email: 'test@example.com',
      isAdmin: false,
    });
    expect(spyCompare).toHaveBeenCalledWith('password123', expect.any(String));
  });

  it('should return null for invalid credentials', async () => {
    await service.register('testUser', 'test@example.com', 'password123');
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    const user = await service.validateUser(
      'test@example.com',
      'wrongPassword',
    );
    expect(user).toBeNull();
  });

  it('should generate a valid JWT token on login', async () => {
    const user = { id: '123', username: 'testUser', isAdmin: true };
    jest.spyOn(jwtService, 'sign').mockReturnValue('testToken');
    const token = await service.login(user);
    expect(token).toEqual({ access_token: 'testToken' });
    expect(jwtService.sign).toHaveBeenCalledWith({
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin,
    });
  });

  it('should verify a valid token', () => {
    jest
      .spyOn(jwtService, 'verify')
      .mockReturnValue({ sub: '123', username: 'testUser' });
    const payload = service.verifyToken('validToken');
    expect(payload).toEqual({ sub: '123', username: 'testUser' });
    expect(jwtService.verify).toHaveBeenCalledWith('validToken');
  });

  it('should throw UnauthorizedException for invalid token', () => {
    jest.spyOn(jwtService, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });
    expect(() => service.verifyToken('invalidToken')).toThrowError(
      'Invalid token',
    );
  });
});
