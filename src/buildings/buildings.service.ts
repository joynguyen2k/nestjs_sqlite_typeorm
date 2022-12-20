import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetBuildingsDto } from './dto/building.dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}
  async findAll(getBuildingsDto: GetBuildingsDto) {
    const { limit, startAfter } = getBuildingsDto;
    if (!startAfter || startAfter < 0) {
      throw new HttpException(
        'The number of page size must be greater than 0',
        400,
      );
    }

    const buildings = await this.dataSource.query(`
      SELECT 
        b.OSEBuildingID,
        b.PropertyName,
        b.PrimaryPropertyType
      FROM buildings b 
      ORDER BY b.PropertyName ASC
      LIMIT ${+limit}
      OFFSET ${+limit * (+startAfter - 1)}
    `);
    return buildings;
  }

  async findById(id: string) {
    const buildings = await this.dataSource.query(`
      SELECT 
        b.OSEBuildingID,
        b.PropertyName, 
        b.BuildingType,
        b.PrimaryPropertyType, 
        b.Address, 
        b.NumberofFloors, 
        b.CouncilDistrictCode, 
        b.YearBuilt, 
        b.Latitude, 
        b.Longitude 
      FROM buildings b 
      WHERE b.OSEBuildingID = '${id}'
    `);
    if (JSON.stringify(buildings) == '[]') {
      throw new NotFoundException('Cannot find this building!');
    }
    return buildings;
  }

  async getChartBuildings() {
    const charts = await this.dataSource.query(`
      SELECT 
        type, 
        avg(eui) AS average_eui 
      FROM 
      (
        SELECT 
          t.OSEBuildingID AS id, 
          t.PrimaryPropertyType AS type, 
          t2.electricity / t1.gfa AS eui 
        FROM 
          buildings t 
          LEFT JOIN (
            SELECT 
              OSEBuildingID AS id, 
              SUM(PropertyUseTypeGFA) AS gfa 
            FROM 
              buildings_gfa 
            GROUP BY
              OSEBuildingID
          ) t1 ON t.OSEBuildingID = t1.id 
          LEFT JOIN (
            SELECT 
              OSEBuildingID AS id, 
              value AS electricity 
            FROM 
              metrics 
            WHERE 
              metric = 'Electricity'
          ) t2 ON t.OSEBuildingID = t2.id
      ) 
      GROUP BY
        type
      ORDER BY type ASC
    `);
    return charts;
  }
}
