import { useLayoutEffect, useMemo, useState } from 'react';
import Socket from '@src/sockets';
import { getCookie } from '@utils/cookie';
import { TRoomState } from '@fleamarket/common';

const useRoom = () => {
  const [rooms, setRooms] = useState<TRoomState>({});
  const [error, setError] = useState<string>('');

  const socket = useMemo(() => Socket.room({ setRooms, setError }), []);

  useLayoutEffect(() => {
    const { connect, disconnect } = socket;
    connect({ authToken: getCookie('auth') ?? '' });

    return () => {
      disconnect();
    };
  }, [socket]);

  return {
    error,
    rooms,
    ...socket,
  };
};

export default useRoom;
