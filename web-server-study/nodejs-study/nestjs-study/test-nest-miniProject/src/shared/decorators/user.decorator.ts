import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 获取请求中包含的user字段的荷载信息,该信息为jwt生成时放置的信息
 * 使用(@JwtUser() user) => console.log(user) => {id:"xx",role:'xx',...}
 */
export const JwtUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user && user[data] : user;
});