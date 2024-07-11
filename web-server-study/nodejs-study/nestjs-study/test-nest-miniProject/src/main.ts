import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import {
  initSwaggerCommonModule,
  initSwaggerMobileModule,
  initSwaggerPlatformModule,
} from './libs/swagger/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局注册通用验证管道ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // 注册全局通用响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 注册全局通用异常过滤器HttpExceptionFilter
  app.useGlobalFilters(new HttpExceptionFilter());

  // ip限速
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // 增强nodejs应用web相关的功能安全
  app.use(helmet());

  //开启跨源资源共享CORS
  app.enableCors();

  // swagger文档
  if (process.env.NODE_ENV !== 'prod') {
    initSwaggerCommonModule(app);
    initSwaggerMobileModule(app);
    initSwaggerPlatformModule(app);
  }

  console.log('process.env', process.env);
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  await app.listen(3000);
}
bootstrap();
