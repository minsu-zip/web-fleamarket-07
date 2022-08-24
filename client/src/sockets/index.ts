import io from 'socket.io-client';
import { API_END_POINT } from '@constants/envs';

const BASE_URL = API_END_POINT;

const initSocket = () => {
  const socket = io(BASE_URL, {
    transports: ['websocket'],
    withCredentials: true,
    // 기존 Connection 재사용 여부
    forceNew: true,
  });
  socket.disconnect();

  return {
    getSID: () => socket.id,
    connect: () => socket.connect(),
    disconnect: () => socket.disconnect(),
  };
};

export default initSocket();
