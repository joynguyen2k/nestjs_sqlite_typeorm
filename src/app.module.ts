import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BuildingsModule } from './buildings/buildings.module';
import { Building } from './buildings/entities/building.entity';
import { DatabaseConnectionService } from './database-connection.service';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [config],
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useClass: DatabaseConnectionService,
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: ['dist/buildings/entities/*.entity.js'],
      synchronize: true,
    }),
    AuthModule,
    BuildingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
