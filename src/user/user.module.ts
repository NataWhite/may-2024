import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {AuthModule} from "../auth/auth.module";
import {AuthService} from "../auth/auth.service";

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
