import io from 'socket.io-client';
import { SOCKET_END_POINT } from '@constants/envs';
import chat from './chat';

const BASE_URL = SOCKET_END_POINT;

const initSocket = () => {
  const socket = io(BASE_URL, {
    transports: ['websocket'],
    withCredentials: true,
    forceNew: true,
    autoConnect: false,
  });

  const connect = () => {
    if (socket.active) return;
    socket.connect();
  };

  const disconnect = () => {
    if (!socket.active) return;
    socket.disconnect();
  };

  return {
    getSID: () => socket.id,
    getConnState: () => socket.active,
    connect,
    disconnect,
    chat: chat(socket),
  };
};

const Socket = initSocket();
export default Socket;
