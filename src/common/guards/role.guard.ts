import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core";


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        let userRoleAllowed = this.reflector.get<string[]>('roles', context.getHandler());
        if (!userRoleAllowed) {
            userRoleAllowed = this.reflector.get<string[]>('roles', context.getClass());
            if (!userRoleAllowed) {
                return true;
            }
        }
        if (userRoleAllowed.includes(request.user.role)) return true;

        return false;
    }
}