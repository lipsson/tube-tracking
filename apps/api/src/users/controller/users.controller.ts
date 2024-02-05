import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Users } from '../schema/users.schema';
import { CreateUserDto } from '../dto/add-user';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { };

    @Get()
    async getAllUsers(): Promise<Users[]> {
        return this.usersService.findAllUsers();
    }

    @Post()
    async createUser(
        @Body()
        user: CreateUserDto,
    ): Promise<Users> {
        return this.usersService.create(user);
    }

    @Get(':uid')
    async getUserDetalis(
        @Param('uid')
        uid: string,
    ): Promise<Users> {
        return this.usersService.findById(uid);
    }

    @Delete(':uid')
    async deleteUser(
        @Param('uid')
        uid: string,
    ): Promise<Users> {
        return this.usersService.deleteById(uid);
    }

}
