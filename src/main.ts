import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //인스턴스 생성
  await app.listen(3000);
}
bootstrap();
