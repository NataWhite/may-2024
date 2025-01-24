import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import {RedisModule} from "@webeleon/nestjs-redis";

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
    forwardRef(() => RedisModule.forFeature()),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
