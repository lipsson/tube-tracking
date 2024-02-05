import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePersonDto } from '../dto/add-person';
import { UpdatePersonDto } from '../dto/update-person';
import { Person } from '../schema/lad-workers.schema';
import { LabWorkersService } from '../services/lab-workers.service';

@Controller('lab-workers')
export class LabWorkersController {
    constructor(private labWorkersModel: LabWorkersService) { };

    @Get()
    async getAllPerson(): Promise<Person[]> {
        return this.labWorkersModel.findAllPerson();
    }

    @Post()
    async createUser(
        @Body()
        person: CreatePersonDto,
    ): Promise<Person> {
        return this.labWorkersModel.create(person);
    }

    @Get(':uid')
    async getUserDetalis(
        @Param('uid')
        uid: string,
    ): Promise<Person> {
        return this.labWorkersModel.findById(uid);
    }

    @Put(':uid')
    async updatePerson(
        @Param('uid')
        uid: string,
        @Body()
        person: UpdatePersonDto,
    ): Promise<Person> {
        return this.labWorkersModel.updateById(uid, person);
    }

    @Delete(':uid')
    async deleteUser(
        @Param('uid')
        uid: string,
    ): Promise<Person> {
        return this.labWorkersModel.deleteById(uid);
    }
}
