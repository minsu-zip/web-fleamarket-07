import React, { useLayoutEffect } from 'react';
import useChat from '@hooks/useChat';
import Socket from '@src/sockets';
import { useParams } from 'react-router-dom';
import ChatList from '@components/organisms/ChatList';
import styled from '@emotion/styled';
import TopBar from '@components/molecules/TopBar';
import { COLOR } from '@constants/style';
import ChatInput from '@components/molecules/ChatInput';

const Chat: React.FC = () => {
  const { roomId: roomIdString } = useParams();
  const roomId = Number(roomIdString);

  // TODO : Room ID 값이 isNaN일 때 처리
  const { chats, sendMessage } = useChat({ roomId });
  useLayoutEffect(() => {
    Socket.connect();

    return () => {
      Socket.disconnect();
    };
  }, []);

  return (
    <ContainerDiv>
      <TopBar background={COLOR.offWhite} />
      <header className='header'></header>
      <div className='contents'>
        <ChatList chats={chats} />
      </div>
      <ChatInput sendMessage={sendMessage} />
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;

  & > * {
    flex: 0 0 auto;
  }
  & > .contents {
    flex: 1;
    overflow: hidden;
  }
`;

export default Chat;
