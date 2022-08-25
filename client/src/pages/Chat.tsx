import React, { useLayoutEffect, useState } from 'react';
import useChat from '@hooks/useChat';
import Socket from '@src/sockets';
import { Input } from '@mui/material';
import { useParams } from 'react-router-dom';
import ChatList from '@components/organisms/ChatList';
import styled from '@emotion/styled';
import TopBar from '@components/molecules/TopBar';
import { COLOR } from '@constants/style';

const Chat: React.FC = () => {
  const { roomId: roomIdString } = useParams();
  const roomId = Number(roomIdString);

  // TODO : Room ID 값이 isNaN일 때 처리
  const { chats, sendMessage } = useChat({ roomId });
  const [content, setContent] = useState<string>('');

  useLayoutEffect(() => {
    Socket.connect();

    return () => {
      Socket.disconnect();
    };
  }, []);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  // TODO : 내가 보낸 메세지를 받았을 때 대기 처리 없애기
  // TODO : 메세지를 서로가 읽었는 지 확인할 수 있는 로직
  const submitMessage = () => {
    sendMessage({ content });
    setContent('');
  };

  return (
    <ContainerDiv>
      <TopBar background={COLOR.offWhite} />
      <header className='header'></header>
      <div className='contents'>
        <ChatList chats={chats} />
      </div>
      <footer className='footer'>
        <Input value={content} onChange={onChangeInput} />
        <button onClick={submitMessage}>Chat</button>
      </footer>
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
