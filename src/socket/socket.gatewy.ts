import {Injectable} from "@nestjs/common";
import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {AuthService} from "../auth/auth.service";

@Injectable()
@WebSocketGateway({
    pingTimeout: 60000,
})
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly authService: AuthService) {}

    @SubscribeMessage('sign-in')
    async joinInRoom(client: Socket, data: { token: string }): Promise<any> {
        console.log(data, 'data')
        console.log('----------------------')
        try {
            const user = await this.authService.validate(data.token);
            console.log(user, 'user');
            if (!user?.id) {
                client.emit('user-unauthorized', {
                    statusCode: 401,
                    error: 'Unauthorized',
                })

                return 'Unauthorized';
            }

            client.join(user.id);
        } catch (e) {
            return 'Unauthorized';
        }

        return 'Join success';
    }

    @SubscribeMessage('leave-room')
    async leaveRoom(client: Socket, data: { token: string }): Promise<any> {
        const user = await this.authService.validate(data.token);
        if (!user?.id) {
            client.emit('user-unauthorized', {
                statusCode: 401,
                error: 'Unauthorized',
            })

            return 'Unauthorized';
        }

        client.leave(user.id);

        return 'Leave success';
    }

    public sendMessage(to: string, event: string, data?: any) {
        // .....

        this.server.in(to).emit(event, data);
    }
}