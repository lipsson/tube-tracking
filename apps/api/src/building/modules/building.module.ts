import { Module } from '@nestjs/common';
import { BuildingController } from '../controller/building.controller';
import { BuildingService } from '../services/building.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingsListSchema } from '../schema/building.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Building', schema: BuildingsListSchema }])],
  controllers: [BuildingController],
  providers: [BuildingService]
})
export class BuildingModule { }
