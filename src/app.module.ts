import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { DatabaseModule } from './database/database.module';
import {RedisModule} from "@webeleon/nestjs-redis";
import {SocketModule} from "./socket/socket.module";

@Module({
  imports: [
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
      SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
