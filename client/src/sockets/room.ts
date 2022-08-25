import { Socket } from 'socket.io-client';
import {
  EChatEvent,
  TRoomConnect,
  TChatReceive,
  TChatSending,
} from '@fleamarket/common';

interface IProps {
  setInitialChats: (chats: TChatReceive[]) => void;
  setRefinedChats: (newChat: TChatReceive) => void;
}

interface IReturns {
  sendMessage: (chatContent: TChatSending) => void;
  connect: (connectDto: TRoomConnect) => void;
  disconnect: () => void;
}

const chat =
  (socket: Socket) =>
  ({ setInitialChats, setRefinedChats }: IProps): IReturns => {
    const connect = (connectDto: TRoomConnect) => {
      socket.once(
        EChatEvent.entered,
        ({ chats }: { chats: TChatReceive[] }) => {
          console.log('entered');
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
