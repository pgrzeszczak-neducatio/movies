import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useStaticAssets(join(__dirname, '../public'), {
      index: false,
      redirect: false
  });
  await app.listen(3000);
}
bootstrap();
