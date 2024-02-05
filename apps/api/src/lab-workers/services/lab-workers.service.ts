import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Person } from '../schema/lad-workers.schema';

@Injectable()
export class LabWorkersService {
    constructor(
        @InjectModel(Person.name)
        private labWorkersModel: mongoose.Model<Person>
    ) { }

    async findAllPerson(): Promise<Person[]> {
        const users = await this.labWorkersModel.find();
        return users;
    };

    async create(person: Person): Promise<Person> {
        const res = await this.labWorkersModel.create(person);
        return res;
    }

    async findById(uid: string): Promise<Person> {
        const workers = await this.labWorkersModel.findById(uid);

        if (!workers) {
            throw new NotFoundException('Workers not found.');
        }

        return workers;
    }

    async updateById(uid: string, person: Person): Promise<Person> {
        return await this.labWorkersModel.findByIdAndUpdate(uid, person, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(uid: string): Promise<Person> {
        return await this.labWorkersModel.findByIdAndDelete(uid);
    }
}
