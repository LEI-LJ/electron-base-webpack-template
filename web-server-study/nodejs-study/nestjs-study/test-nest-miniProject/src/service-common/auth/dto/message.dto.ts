import { ApiProperty } from "@nestjs/swagger";
import { MessageType } from "src/shared/enums/index.enum";

export class MessageDto {
  @ApiProperty({ description: '手机号', required: true })
  phone: string;
  @ApiProperty({ description: '验证码类型',enum: MessageType, required: true })
  messageType: string;
}
