import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { commonModules } from 'src/service-common';
import { mobileModules } from 'src/service-mobile';
import { platformModules } from 'src/service-platform';

/**
 * 公共模块新页面
 */
export function initSwaggerCommonModule(app) {
  const options = new DocumentBuilder()
    .setTitle('公共模块文档')
    .setDescription('全局公共模块的管理内容')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
     include: [...commonModules],
  });
  SwaggerModule.setup('api/common', app, document);
}
/**
 * 平台模块新页面
 */
export function initSwaggerPlatformModule(app) {
  const options = new DocumentBuilder()
    .setTitle('平台管理模块文档')
    .setDescription('全局后台管理模块的内容')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
     include: [...platformModules],
  });
  SwaggerModule.setup('api/platform', app, document);
}
/**
 * 移动端模块新页面
 */
export function initSwaggerMobileModule(app) {
  const options = new DocumentBuilder()
    .setTitle('移动端模块文档')
    .setDescription('全局移动端模块的管理内容')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
     include: [...mobileModules],
  });
  SwaggerModule.setup('api/mobile', app, document);
}