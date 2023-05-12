import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import * as moment from 'moment-timezone';

async function bootstrap() {

  // moment 객체 한국 시간대로 설정
  moment.tz.setDefault('Asia/Seoul');

  const app = await NestFactory.create(ApiModule);
  await app.listen(3000);
}
bootstrap();
