import { Socket } from 'socket.io-client';
import {
  ERoomEvent,
  TRoomConnect,
  TRoomReceive,
  TRoomEntered,
  TRoomState,
} from '@fleamarket/common';

interface IProps {
  setRooms: React.Dispatch<React.SetStateAction<TRoomState | undefined>>;
}

interface IReturns {
  connect: (connectDto: TRoomConnect) => void;
  disconnect: () => void;
}

const room =
  (socket: Socket) =>
  ({ setRooms }: IProps): IReturns => {
    const connect = (connectDto: TRoomConnect) => {
      socket.once(ERoomEvent.entered, ({ rooms }: TRoomEntered) => {
        console.log('entered');
        setRooms(() =>
          rooms.reduce((acc, room) => {
            acc[room.id] = room;

            return acc;
          }, {} as TRoomState),
        );
      });
      socket.on(ERoomEvent.receive, (newRoom: TRoomReceive) => {
        console.log('received', newRoom);
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
