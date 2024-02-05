import { Module } from '@nestjs/common';
import { SamplesService } from '../services/samples.service';
import { SamplesController } from '../controller/samples.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SamplesListSchema } from '../schema/samples.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sample', schema: SamplesListSchema }])],
  providers: [SamplesService],
  controllers: [SamplesController]
})
export class SamplesModule { }
