import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Sample } from '../schema/samples.schema';

@Injectable()
export class SamplesService {
    constructor(
        @InjectModel(Sample.name)
        private samplesModel: mongoose.Model<Sample>
    ) { }

    async findAllSample(): Promise<Sample[]> {
        const users = await this.samplesModel.find();
        return users;
    };

    async create(sample: Sample): Promise<Sample> {
        const res = await this.samplesModel.create(sample);
        return res;
    }

    async findById(uid: string): Promise<Sample> {
        const user = await this.samplesModel.findById(uid);

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    async updateById(uid: string, sample: Sample): Promise<Sample> {
        return await this.samplesModel.findByIdAndUpdate(uid, sample, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(uid: string): Promise<Sample> {
        return await this.samplesModel.findByIdAndDelete(uid);
    }
}
