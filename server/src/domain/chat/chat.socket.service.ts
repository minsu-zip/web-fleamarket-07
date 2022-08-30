import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { EChatEvent, TChatConnect, TChatSending } from '@fleamarket/common';
import { ChatService } from './chat.service';
import { WsException } from '@nestjs/websockets';
import { RoomService } from '../room/room.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class ChatSocketService {
  constructor(
    private readonly roomService: RoomService,
    private readonly chatService: ChatService,
    private readonly productService: ProductService,
  ) {}

  private logger: Logger = new Logger('Chat Socket');

  async connectChat(client: Socket, { productId, buyerId }: TChatConnect) {
    this.logger.verbose(`CHAT-Connect : ${client.id}`);
    try {
      const { userId } = client.data;
      client.leave(client.id);

      const product = await this.productService.findOneBasic(productId);
      if (!product) throw Error('채팅 연결 오류 : 상품이 없습니다');
      if (!buyerId && userId === product.userId)
        throw Error(
          '채팅 연결 오류 : 자기 자신 상품의 채팅을 생성할 수 없습니다',
        );

      let sellerId = userId;
      if (!buyerId) {
        buyerId = userId;
        sellerId = product.userId;
      }

      const { id: roomId } = await this.roomService.findOrCreate(
        productId,
        +sellerId,
        +buyerId,
      );

      const roomCode = roomId.toString();
      client.data.roomId = roomCode;
      client.join(roomCode);
    } catch ({ message }) {
      throw new WsException(
        message ?? '채팅 연결 오류 : 서버 데이터에 문제가 있습니다.',
      );
    }
  }

  disconnectChat(client: Socket) {
    this.logger.verbose(`CHAT-Disconnect : ${client.id}`);

    const { roomId } = client.data;
    client.to(roomId).emit(EChatEvent.leaving);
    client.leave(roomId);
  }

  async initialChat(client: Socket) {
    const { roomId } = client.data;

    const chats = await this.chatService.findAllByRoom(roomId);
    const room = await this.roomService.findOneDetail(roomId);

    client.emit(EChatEvent.entered, { chats, room });
  }

  async sendChat(client: Socket, sendDto: TChatSending) {
    this.logger.verbose(`Chat Sending : ${JSON.stringify(sendDto)}`);

    const { content } = sendDto;
    const { roomId, userId } = client.data;
    try {
      const newChat = await this.chatService.create({
        content,
        roomId,
        userId,
      });
      delete newChat['roomId'];
      client.to(roomId).emit(EChatEvent.receive, newChat);
    } catch ({ message }) {
      throw new WsException(message);
    }
  }
}
