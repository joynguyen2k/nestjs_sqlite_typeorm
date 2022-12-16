import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('buildings')
export class Building extends BaseEntity {
  @PrimaryColumn()
  OSEBuildingID: number;

  @Column()
  DataYear: number;

  @Column()
  BuildingType: string;

  @Column()
  PrimaryPropertyType: string;

  @Column()
  PropertyName: string;

  @Column()
  Address: string;

  @Column()
  City: string;

  @Column()
  State: string;

  @Column()
  ZipCode: number;

  @Column()
  TaxParcelIdentificationNumber: string;

  @Column()
  CouncilDistrictCode: number;

  @Column()
  Latitude: number;

  @Column()
  Longitude: number;

  @Column()
  YearBuilt: number;

  @Column()
  NumberofBuildings: number;

  @Column()
  NumberofFloors: number;
}
