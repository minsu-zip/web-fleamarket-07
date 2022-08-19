import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, LocationModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
