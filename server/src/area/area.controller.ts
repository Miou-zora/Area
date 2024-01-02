import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AreaService } from './area.service';
import { NewAreaDto } from './dto';

@Controller(':token/')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get('areas')
  getAreas(@Param('token') token: string) {
    return this.areaService.getAreas(token);
  }
  @Get('areas/:id')
  getArea(@Param('token') token: string, @Param('id') id: string) {
    return this.areaService.getArea(token, id);
  }
  @Post('areas')
  setAreas(@Param('token') token: string, @Body() body: NewAreaDto) {
    return this.areaService.setAreas(token, body);
  }
}
