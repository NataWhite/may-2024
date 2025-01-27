import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { Strategy} from 'passport-http-bearer'
import {JwtService} from "@nestjs/jwt";
import {InjectRedisClient, RedisClient} from "@webeleon/nestjs-redis";
import {AuthService} from "./auth.service";

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRedisClient() private readonly redisClient: RedisClient,
        private readonly authService: AuthService,
    ) {
        super();
    }

    async validate(token: string) {
        try {
            const decodeToken: any = this.jwtService.decode(token);
            if (!(await this.redisClient.exists(`user-token-${decodeToken?.id}`))) {
                throw new UnauthorizedException();
            }
            await this.jwtService.verifyAsync(token);
            const user = await this.authService.validateUser(decodeToken.id, decodeToken.email);
            return user;
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }

    }
}