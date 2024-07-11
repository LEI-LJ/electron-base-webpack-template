
import { ApiProperty } from '@nestjs/swagger'
export class RoleListDTO {

  @ApiProperty({
    description: '角色昵称',
    required: false
  })
  roleName: string

  @ApiProperty({
    description: '角色状态（0正常 1停用）',
    required: false
  })
  status: number

  @ApiProperty({
    description: '排序字段',
    required: false
  })
  orderBy: string

  @ApiProperty({
    description: '排序方式',
    enum: ['DEAS', 'AES'],
    required: false
  })
  sort: any
}