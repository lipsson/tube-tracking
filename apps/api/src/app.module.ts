import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/module/users.module';
import { SamplesModule } from './samples/module/samples.module';
import { LabWorkersModule } from './lab-workers/module/lab-workers.module';
import { BuildingModule } from './building/modules/building.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
    UsersModule,
    SamplesModule,
    LabWorkersModule,
    BuildingModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
