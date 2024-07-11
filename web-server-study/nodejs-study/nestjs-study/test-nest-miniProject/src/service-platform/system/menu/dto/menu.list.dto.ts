
import { ApiProperty } from '@nestjs/swagger'
export class MenuListDTO {

  @ApiProperty({
    description: '菜单名称',
    required: false
  })
  menuName: string

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