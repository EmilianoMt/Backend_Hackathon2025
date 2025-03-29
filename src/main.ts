import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {

      origin: 'exp://148.220.60.103:8081',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
    
  });
 

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT||4000|| "0.0.0.0");
}
bootstrap();
