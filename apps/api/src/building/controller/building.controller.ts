import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Building } from '../schema/building.schema';
import { BuildingService } from '../services/building.service';
import { CreateBuildingDto } from '../dto/add-building';
import { UpdateBuildingDto } from '../dto/update-building';

@Controller('buildings')
export class BuildingController {
    constructor(private buildingModel: BuildingService) { };

    @Get()
    async getAllBuilding(): Promise<Building[]> {
        return this.buildingModel.findAllBuilding();
    };

    @Get(':uid')
    async findById(
        @Param('uid')
        uid: string,
    ): Promise<Building> {
        return this.buildingModel.findById(uid);
    }

    @Post()
    async createUser(
        @Body()
        building: CreateBuildingDto,
    ): Promise<Building> {
        return this.buildingModel.create(building);
    };

    @Put(':uid')
    async updateBuilding(
        @Param('uid')
        uid: string,
        @Body()
        building: UpdateBuildingDto,
    ): Promise<Building> {
        return this.buildingModel.updateById(uid, building);
    }

    @Delete(':uid')
    async deleteBuilding(
        @Param('uid')
        uid: string,
    ): Promise<Building> {
        return this.buildingModel.deleteById(uid);
    }

}
