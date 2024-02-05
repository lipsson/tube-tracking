import { Module } from '@nestjs/common';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersListSchema } from '../schema/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersListSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
