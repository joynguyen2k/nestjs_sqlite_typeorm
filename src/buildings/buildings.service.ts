import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  async findAll() {
    const buildings = await this.buildingRepository.exist();
    return buildings;
  }
}
