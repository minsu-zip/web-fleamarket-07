import { useLayoutEffect, useMemo, useState } from 'react';
import Socket from '@src/sockets';
import { getCookie } from '@utils/cookie';
import { TRoomState } from '@fleamarket/common';

const useRoom = () => {
  const [rooms, setRooms] = useState<TRoomState>();
  const socket = useMemo(() => Socket.room({ setRooms }), []);

  useLayoutEffect(() => {
    const { connect, disconnect } = socket;
    connect({ authToken: getCookie('auth') ?? '' });

    return () => {
      disconnect();
    };
  }, [socket]);

  return {
    rooms,
    ...socket,
  };
};

export default useRoom;
