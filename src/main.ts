import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' })
  // 设置cookie的有效期为1天，并设置httpOnly属性
  app.use(session({
    secret: 'guang',
    cookie: { maxAge: 10000 }
  }))

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')

  await app.listen(3000);
  // setTimeout(() => {
  //   app.close()
  // }, 3000)
}
bootstrap();
