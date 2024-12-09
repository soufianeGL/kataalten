import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App E2E Test Suite', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    it('/auth/register (POST) - should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          username: 'testUser',
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.username).toBe('testUser');
          expect(res.body.email).toBe('test@example.com');
        });
    });

    it('/auth/login (POST) - should login the user and return a token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201);

      accessToken = response.body.access_token;
      expect(accessToken).toBeDefined();
    });

    it('/auth/login (POST) - should fail with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongPassword',
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('Invalid credentials');
        });
    });
  });

  describe('Products', () => {
    let productId: string;

    it('/products (POST) - should create a product', async () => {
      const response = await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`) // Use admin token if roles are implemented
        .send({
          code: 'P001',
          name: 'Test Product',
          category: 'TestCategory',
          price: 100,
          quantity: 10,
        })
        .expect(201);

      productId = response.body._id; // Assuming the response returns the product ID
      expect(productId).toBeDefined();
    });

    it('/products (GET) - should retrieve all products', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0]).toHaveProperty('name', 'Test Product');
    });

    it('/products/:id (GET) - should retrieve a single product', async () => {
      const response = await request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(200);

      expect(response.body).toHaveProperty('name', 'Test Product');
    });

    it('/products/:id (PATCH) - should update a product', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/${productId}`)
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .send({ name: 'Updated Product' })
        .expect(200);

      expect(response.body).toHaveProperty('name', 'Updated Product');
    });

    it('/products/:id (DELETE) - should delete a product', async () => {
      await request(app.getHttpServer())
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .expect(200);
    });
  });
});
