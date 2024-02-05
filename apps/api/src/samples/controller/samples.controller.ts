import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SamplesService } from '../services/samples.service';
import { CreateSampleDto } from '../dto/add-sample';
import { UpdateSampleDto } from '../dto/update-sample';
import { Sample } from '../schema/samples.schema';

@Controller('samples')
export class SamplesController {
    constructor(private samplesModel: SamplesService) { };

    @Get()
    async getAllSample(): Promise<Sample[]> {
        return this.samplesModel.findAllSample();
    }

    @Post()
    async createUser(
        @Body()
        sample: CreateSampleDto,
    ): Promise<Sample> {
        return this.samplesModel.create(sample);
    }

    @Get(':uid')
    async getUserDetalis(
        @Param('uid')
        uid: string,
    ): Promise<Sample> {
        return this.samplesModel.findById(uid);
    }

    @Put(':uid')
    async updateSample(
        @Param('uid')
        uid: string,
        @Body()
        sample: UpdateSampleDto,
    ): Promise<Sample> {
        return this.samplesModel.updateById(uid, sample);
    }

    @Delete(':uid')
    async deleteUser(
        @Param('uid')
        uid: string,
    ): Promise<Sample> {
        return this.samplesModel.deleteById(uid);
    }
}
