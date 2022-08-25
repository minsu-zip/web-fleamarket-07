import { useLayoutEffect, useMemo, useState } from 'react';
import { TChatReceive } from '@fleamarket/common';
import Socket from '@src/sockets';
import { getCookie } from '@utils/cookie';

interface IProps {
  roomId: number;
}

const useChat = ({ roomId }: IProps) => {
  const [chats, setChats] = useState<{ [id: number]: TChatReceive }>({});

  const setRefinedChats = (newChat: TChatReceive) => {
    setChats((prev) => ({ ...prev, [newChat.id]: newChat }));
  };

  const socket = useMemo(() => Socket.chat({ setChats: setRefinedChats }), []);
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
