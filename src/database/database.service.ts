import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { BaseEntity } from './entities/base.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresConfig = this.configService.get('database');
    return {
      type: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.user,
      password: postgresConfig.password,
      database: postgresConfig.database,
      entities: [User, Post],
      // migrations
      synchronize: true,
    };
  }
}
