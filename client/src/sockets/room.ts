import React from 'react';
import { Socket } from 'socket.io-client';
import {
  ERoomEvent,
  TRoomConnect,
  TRoomReceive,
  TRoomEntered,
  TRoomState,
} from '@fleamarket/common';

interface IProps {
  setRooms: React.Dispatch<React.SetStateAction<TRoomState>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

interface IReturns {
  connect: (connectDto: TRoomConnect) => void;
  disconnect: () => void;
}

const room =
  (socket: Socket) =>
  ({ setRooms, setError }: IProps): IReturns => {
    const connect = (connectDto: TRoomConnect) => {
      socket.once(ERoomEvent.entered, ({ rooms }: TRoomEntered) => {
        setRooms(() =>
          rooms.reduce((acc, room) => {
            acc[room.id] = room;

            return acc;
          }, {} as TRoomState),
        );
      });
      socket.on(ERoomEvent.receive, (newRoom: TRoomReceive) => {
        console.log('received', newRoom);
        // 새로운 방 OR 채팅이 왔을 때 알람 처리
      });
      socket.on('exception', ({ message }) => {
        setError(message);
      });
      socket.emit(ERoomEvent.connect, connectDto);
    };

    const disconnect = () => {
      socket.off(ERoomEvent.entered);
      socket.off(ERoomEvent.receive);
    };

    return { connect, disconnect };
  };

export default room;
