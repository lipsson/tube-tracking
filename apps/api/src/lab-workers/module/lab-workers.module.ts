import { Module } from '@nestjs/common';
import { LabWorkersService } from '../services/lab-workers.service';
import { LabWorkersController } from '../controller/lab-workers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LabWorkersListSchema } from '../schema/lad-workers.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Person', schema: LabWorkersListSchema }])],
  providers: [LabWorkersService],
  controllers: [LabWorkersController]
})
export class LabWorkersModule { }
