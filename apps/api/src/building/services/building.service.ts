import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UpdateBuildingDto } from '../dto/update-building';
import { Building } from '../schema/building.schema';

@Injectable()
export class BuildingService {
    constructor(
        @InjectModel(Building.name)
        private buildingModel: mongoose.Model<Building>
    ) { }

    async findAllBuilding(): Promise<Building[]> {
        const res = await this.buildingModel.find();
        return res;
    };

    async create(building: Building): Promise<Building> {
        const res = await this.buildingModel.create(building);
        return res;
    }

    async findById(uid: string): Promise<Building> {
        const building = await this.buildingModel.findById(uid);

        if (!building) {
            throw new NotFoundException('Building not found.');
        }

        return building;
    }

    async updateById(uid: string, building: UpdateBuildingDto): Promise<Building> {
        return await this.buildingModel.findByIdAndUpdate(uid, building, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(uid: string): Promise<Building> {
        return await this.buildingModel.findByIdAndDelete(uid);
    }
}
