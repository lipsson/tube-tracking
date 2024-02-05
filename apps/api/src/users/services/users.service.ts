import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from '../schema/users.schema';
import { hashPassword } from '../middleware/hash-password';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name)
        private usersModel: mongoose.Model<Users>
    ) { }

    async findAllUsers(): Promise<Users[]> {
        const users = await this.usersModel.find();
        return users;
    };

    async create(user: Users): Promise<Users> {
        const hashPass = await hashPassword(user.password);
        const res = await this.usersModel.create({ ...user, password: hashPass });
        return res;
    }

    async findById(uid: string): Promise<Users> {
        const user = await this.usersModel.findById(uid);

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    async deleteById(uid: string): Promise<Users> {
        const user = await this.usersModel.findById(uid);
        // hanrdcode only in testing app
        if (user !== null && user._id.toString() == '65be9074cbfde022608539d3') {
            throw new UnauthorizedException('Cannot delete admin');
        };
        return await this.usersModel.findByIdAndDelete(uid);
    }
};
