import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  // Set NODE_ENV early if not set
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
    this.console.warn('NODE_ENV not set, defaulting to "development". For production use: NODE_ENV=production');
  }

  // Create the Nest app first
  const app = await NestFactory.create(AppModule);

  // Get ConfigService from the Nest container
  const configService = app.get(ConfigService);

  // Use ConfigService to check environment
  const isProd = configService.get<string>('NODE_ENV') === 'production';

  // Set logger configuration dynamically
  app.useLogger(
    isProd
      ? ['error', 'warn', 'log'] // production: quieter
      : ['error', 'warn', 'log', 'debug', 'verbose'] // dev: full logs
  );

  app.useGlobalPipes(
    new ValidationPipe()
  );
  
  app.setGlobalPrefix('api');
  
  // Swagger config (only for dev)
  const config = new DocumentBuilder()
    .setTitle('Ai nutrition API')
    .setDescription('API for managing ai nutrition API')
    .setVersion('1.0')
    .addTag('users')
    .addTag('meals')
    .addTag('ai')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const PORT = process.env.PORT ?? 3000;



  await app.listen( PORT );
  console.log(`🚀 Application running on: http://localhost:${PORT}`);
  console.log(`📘 Swagger docs: http://localhost:${PORT}/api/docs`);
}
bootstrap();
