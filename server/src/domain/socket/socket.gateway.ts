import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { config } from 'dotenv';
import {
  EChatEvent,
  ERoomEvent,
  TChatConnect,
  TChatSending,
} from '@fleamarket/common';
import { Logger, UseGuards } from '@nestjs/common';
import { ChatSocketService } from '../chat/chat.socket.service';
import { AuthSocketGuard } from '../auth/auth.socket.guard';
import { RoomSocketService } from '../room/room.socket.service';

config();
const SOCKET_PORT = process.env.SOCKET_PORT;

@WebSocketGateway(Number(SOCKET_PORT), {
  transports: ['websocket'],
  cors: { credentials: true },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatSocketService: ChatSocketService,
    private readonly roomSocketService: RoomSocketService,
  ) {}

  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('Socket Gateway');

  // 연결
  public handleConnection(client: Socket) {
    this.logger.verbose(`Client Connected : ${client.id}`);
  }

  // 연결 끊김
  public handleDisconnect(client: Socket) {
    this.chatSocketService.disconnectChat(client);

    this.logger.verbose(`Client Disconnected : ${client.id}`);
  }

  // ---- Chats
  // 누가 들어왔을 때 : 읽었다는 것을 알려주기 위함
  @UseGuards(AuthSocketGuard)
  @SubscribeMessage(EChatEvent.connect)
  async handleChatConnect(client: Socket, connectDto: TChatConnect) {
    await this.chatSocketService.connectChat(client, connectDto);
    await this.chatSocketService.initialChat(client);
  }
  // 나갈 때
  @SubscribeMessage(EChatEvent.leaving)
  handleChatLeaving(client: Socket) {
    this.chatSocketService.disconnectChat(client);
  }

  // 누가 보냈을 때 -> 사람들에게 receive 시키기 위함
  @SubscribeMessage(EChatEvent.sending)
  handleChatSending(client: Socket, message: TChatSending) {
    this.chatSocketService.sendChat(client, message);
  }

  // ---- Rooms
  // 누가 들어왔을 때 : 정보 주기
  @UseGuards(AuthSocketGuard)
  @SubscribeMessage(ERoomEvent.connect)
  async handleRoomConnect(client: Socket) {
    await this.roomSocketService.initialRoom(client);
  }
}
