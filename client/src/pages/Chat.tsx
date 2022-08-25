import React, { useLayoutEffect, useState } from 'react';
import useChat from '@hooks/useChat';
import Socket from '@src/sockets';
import { Input } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getTimeGapString } from '@utils/time';

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
    <>
      {Object.values(chats).map(({ id, content, createdAt }) => {
        return (
          <div key={id}>
            <div>{content}</div>
            <div>{getTimeGapString(createdAt)}</div>
          </div>
        );
      })}
      <Input value={content} onChange={onChangeInput} />
      <button onClick={submitMessage}>Chat</button>
    </>
  );
};

export default Chat;
