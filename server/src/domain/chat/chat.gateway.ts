import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { config } from 'dotenv';
import { EChatEvent } from '@fleamarket/common';

config();
const SOCKET_PORT = process.env.SOCKET_PORT;

@WebSocketGateway(Number(SOCKET_PORT), {
  transports: ['websocket'],
  cors: { credentials: true },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // 처음 접속
  public handleConnection(client: Socket) {
    console.log('connected', client.id);
  }
  // 연결 끊김
  public handleDisconnect(client: Socket): void {
    console.log('disconnected', client.id);
  }

  // 누가 들어왔을 때
  // 읽었다는 것을 알려주기 위함
  @SubscribeMessage(EChatEvent.entered)
  async handleEntered(client: Socket, message) {
    console.log(client.id);
    console.log(message);
  }

  // 누가 보냈을 때
  // -> 사람들에게 receive
  @SubscribeMessage(EChatEvent.sending)
  async handleSending(client: Socket, message) {
    console.log(client.id);
    console.log(message);
  }

  // 누가 나갈 때
  // -> 입장한 사람 없애기
  @SubscribeMessage(EChatEvent.leaving)
  async handleLeaving(client: Socket, message) {
    console.log(client.id);
    console.log(message);
  }
}
