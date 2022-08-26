import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ERoomEvent } from '@fleamarket/common';
import { WsException } from '@nestjs/websockets';
import { RoomService } from '../room/room.service';

@Injectable()
export class RoomSocketService {
  constructor(private readonly roomService: RoomService) {}

  private logger: Logger = new Logger('Room Socket');

  async initialRoom(client: Socket) {
    this.logger.verbose(`ROOM-Connect : ${client.id}`);
    try {
      const userId = client.data.userId;
      this.logger.verbose(`ROOM-Connect : ${userId}`);

      const rooms = await this.roomService.findAllBy({ userId });

      client.emit(ERoomEvent.entered, { rooms });
    } catch ({ message }) {
      this.logger.error(`ROOM-Connect-Error : ${message}`);
      throw new WsException(
        message ?? '채팅방 오류 : 서버 데이터에 문제가 있습니다.',
      );
    }
  }
}
