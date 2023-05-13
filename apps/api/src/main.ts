import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as moment from 'moment-timezone';

async function bootstrap() {

  // moment 객체 한국 시간대로 설정
  moment.tz.setDefault('Asia/Seoul');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
