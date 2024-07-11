import { ApiProperty } from "@nestjs/swagger";

export class PasswordDto {
  @ApiProperty({ description: '手机号', required: true })
  phone: string
  @ApiProperty({ description: '验证码', required: true })
  code: string
  @ApiProperty({ description: '新密码', required: true })
  newPassword: string;
}