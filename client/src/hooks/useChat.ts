import { useLayoutEffect, useMemo, useState } from 'react';
import { TChatReceive, TRoomReceive } from '@fleamarket/common';
import Socket from '@src/sockets';
import { getCookie } from '@utils/cookie';

interface IProps {
  productId: number;
  buyerId?: string;
}

const useChat = ({ productId, buyerId }: IProps) => {
  const [chats, setChats] = useState<TChatReceive[]>([]);
  const [room, setRoom] = useState<TRoomReceive | undefined>();
  const [error, setError] = useState<string>('');

  const setInitialChats = (chats: TChatReceive[]) => {
    setChats(() => [...chats]);
  };

  const setRefinedChats = (newChat: TChatReceive) => {
    setChats((prev) => [...prev, newChat]);
  };

  const socket = useMemo(
    () => Socket.chat({ setInitialChats, setRefinedChats, setRoom, setError }),
    [],
  );
  useLayoutEffect(() => {
    const { connect, disconnect } = socket;
    connect({ productId, buyerId, authToken: getCookie('auth') ?? '' });

    return () => {
      disconnect();
    };
  }, [socket, productId, buyerId]);

  return {
    error,
    room,
    chats,
    ...socket,
  };
};

export default useChat;
