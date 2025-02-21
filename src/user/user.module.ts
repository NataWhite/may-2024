import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import {SocketModule} from "../socket/socket.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, SocketModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
