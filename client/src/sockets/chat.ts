import { Socket } from 'socket.io-client';
import {
  EChatEvent,
  TChatConnect,
  TChatReceive,
  TChatSending,
  TRoomReceive,
} from '@fleamarket/common';

interface IProps {
  setInitialChats: (chats: TChatReceive[]) => void;
  setRefinedChats: (newChat: TChatReceive) => void;
  setRoom: React.Dispatch<React.SetStateAction<TRoomReceive | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

interface IReturns {
  sendMessage: (chatContent: TChatSending) => void;
  connect: (connectDto: TChatConnect) => void;
  disconnect: () => void;
}

const chat =
  (socket: Socket) =>
  ({
    setInitialChats,
    setRefinedChats,
    setRoom,
    setError,
  }: IProps): IReturns => {
    const connect = (connectDto: TChatConnect) => {
      socket.once(
        EChatEvent.entered,
        ({ chats, room }: { chats: TChatReceive[]; room: TRoomReceive }) => {
          console.log('entered');
          setRoom(room);
          setInitialChats(chats);
        },
      );
      socket.on(EChatEvent.receive, (newChat: TChatReceive) => {
        console.log('received', newChat);
        setRefinedChats(newChat);
      });
      socket.on(EChatEvent.leaving, () => {
        console.log('leaving');
      });
      socket.on('exception', ({ message }) => {
        setError(message);
      });
      socket.emit(EChatEvent.connect, connectDto);
    };

    const sendMessage = (sendDto: TChatSending) => {
      console.log('send');
      socket.emit(EChatEvent.sending, sendDto);
    };

    const disconnect = () => {
      socket.emit(EChatEvent.leaving);
      socket.off(EChatEvent.entered);
      socket.off(EChatEvent.receive);
      socket.off(EChatEvent.leaving);
    };

    return { sendMessage, connect, disconnect };
  };

export default chat;
