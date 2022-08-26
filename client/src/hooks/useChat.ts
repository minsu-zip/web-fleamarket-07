import { useLayoutEffect, useMemo, useState } from 'react';
import { TChatReceive, TRoomReceive } from '@fleamarket/common';
import Socket from '@src/sockets';
import { getCookie } from '@utils/cookie';

interface IProps {
  roomId: number;
}

const useChat = ({ roomId }: IProps) => {
  const [chats, setChats] = useState<TChatReceive[]>([]);
  const [room, setRoom] = useState<TRoomReceive | undefined>();

  const setInitialChats = (chats: TChatReceive[]) => {
    setChats(() => [...chats]);
  };

  const setRefinedChats = (newChat: TChatReceive) => {
    setChats((prev) => [...prev, newChat]);
  };

  const socket = useMemo(
    () => Socket.chat({ setInitialChats, setRefinedChats, setRoom }),
    [],
  );
  useLayoutEffect(() => {
    const { connect, disconnect } = socket;
    connect({ roomId, authToken: getCookie('auth') ?? '' });

    return () => {
      disconnect();
    };
  }, [socket, roomId]);

  return {
    room,
    chats,
    ...socket,
  };
};

export default useChat;
