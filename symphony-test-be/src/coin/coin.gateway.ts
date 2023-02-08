import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3003, { path: '/chat' })
export class CoinGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  afterInit(server: Server) {
    console.log('socket server is running');
  }
  handleConnection(client) {
    const message = {
      message: 'Successfully connected',
      client: client.id,
    };
    client.emit('connection', message);
    console.log(client.id);
  }
  //@SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    console.log(payload);
    this.server.emit('rates', 'done');
  }
}
