import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('banner')
@ApiTags('banner管理')
@ApiBearerAuth()
export class BannerController {

  @ApiOperation({
    summary: 'banner列表'
  })
  @Get('bannerlist')
  bannerList(){

  }
}
