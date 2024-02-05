import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { Model } from 'mongoose';
import { Users } from '../../users/schema/users.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Users.name)
        private userModel: Model<Users>,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid password');
        }

        const token = this.jwtService.sign({ user });

        return { token };
    }
}
