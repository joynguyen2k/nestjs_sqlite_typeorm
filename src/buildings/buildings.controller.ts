import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BuildingsService } from './buildings.service';
import { GetBuildingsDto } from './dto/building.dto';

@ApiTags('buildings')
@Controller('buildings')
export class BuildingsController {
  constructor(private buildingService: BuildingsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() getBuildingsDto: GetBuildingsDto) {
    return this.buildingService.findAll(getBuildingsDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('chart')
  async getChartBuildings() {
    return this.buildingService.getChartBuildings();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.buildingService.findById(id);
  }
}
