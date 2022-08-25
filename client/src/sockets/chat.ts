import { Socket } from 'socket.io-client';
import {
  EChatEvent,
  TChatConnect,
  TChatReceive,
  TChatSending,
} from '@fleamarket/common';

interface IProps {
  setChats: (newChat: TChatReceive) => void;
}

interface IReturns {
  sendMessage: (chatContent: TChatSending) => void;
  connect: (connectDto: TChatConnect) => void;
  disconnect: () => void;
}

const chat =
  (socket: Socket) =>
  ({ setChats }: IProps): IReturns => {
    const connect = (connectDto: TChatConnect) => {
      socket.on(EChatEvent.entered, () => {
        console.log('entered');
      });
      socket.on(EChatEvent.receive, (newChat: TChatReceive) => {
        console.log('received', newChat);
        setChats(newChat);
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
