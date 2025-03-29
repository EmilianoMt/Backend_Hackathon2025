import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
    
  });
 

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT||4000);
}
bootstrap();
