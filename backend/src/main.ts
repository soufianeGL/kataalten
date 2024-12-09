import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // Set API prefix for routes

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('API documentation for E-commerce backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.enableCors({
    origin: 'http://localhost:4200', // Angular app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies if needed
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
