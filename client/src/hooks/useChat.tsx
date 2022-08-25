import { useLayoutEffect, useMemo, useState } from 'react';
import { TChatReceive } from '@fleamarket/common';
import Socket from '@src/sockets';
import { getCookie } from '@utils/cookie';

interface IProps {
  roomId: number;
}

const useChat = ({ roomId }: IProps) => {
  const [chats, setChats] = useState<TChatReceive[]>([]);

  const setInitialChats = (chats: TChatReceive[]) => {
    setChats((prev) => [...chats]);
  };

  const setRefinedChats = (newChat: TChatReceive) => {
    setChats((prev) => [...prev, newChat]);
  };

  const socket = useMemo(
    () => Socket.chat({ setInitialChats, setRefinedChats }),
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
    chats,
    ...socket,
  };
};

export default useChat;
