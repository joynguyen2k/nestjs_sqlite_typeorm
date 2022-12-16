import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuildingsService } from './buildings.service';

@ApiTags('buildings')
@Controller('buildings')
export class BuildingsController {
  constructor(private buildingService: BuildingsService) {}

  @Get()
  async findAll() {
    return this.buildingService.findAll();
  }
}
