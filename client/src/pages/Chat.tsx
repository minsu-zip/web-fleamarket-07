import React, { useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useChat from '@hooks/useChat';
import ChatList from '@components/organisms/ChatList';
import styled from '@emotion/styled';
import TopBar from '@components/molecules/TopBar';
import { COLOR } from '@constants/style';
import ChatInput from '@components/molecules/ChatInput';
import Guide from '@components/atoms/Guide';
import ChatRoomInfo from '@components/organisms/ChatRoomInfo';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import ChatController from '@components/molecules/ChatController';

const Chat: React.FC = () => {
  const Auth = useRecoilValue(authAtom);
  const { productId: productIdString } = useParams();
  const productId = Number(productIdString);
  const [searchParams] = useSearchParams();
  const buyerId = searchParams.get('buyer') ?? undefined;

  const listRef = useRef<HTMLSpanElement>(null);
  const scrollToBottom = (options: ScrollIntoViewOptions = {}) => {
    if (listRef.current) listRef.current.scrollIntoView(options);
  };

  const { room, chats, sendMessage, error } = useChat({ productId, buyerId });

  if (error) {
    return (
      <ContainerDiv>
        <TopBar title={'채팅방'} background={COLOR.background} />
        <div className='flex1'>
          <Guide.Error message={error} />
        </div>
      </ContainerDiv>
    );
  }

  if (!room || !Auth)
    return (
      <ContainerDiv>
        <TopBar title={'채팅방'} background={COLOR.background} />
        <div className='flex1'>
          <Guide.Loading />
        </div>
      </ContainerDiv>
    );

  const targetName =
    Auth?.id === room.buyerId ? room.seller.name : room.buyer.name;

  return (
    <ContainerDiv>
      <TopBar title={targetName} background={COLOR.offWhite} />
      <header className='header'>
        <ChatRoomInfo room={room} />
      </header>
      <div className='contents'>
        <ChatList
          room={room}
          chats={chats}
          listRef={listRef}
          scrollToBottom={scrollToBottom}
        />
      </div>
      <ChatController
        lastChat={chats[chats.length - 1]}
        scrollToBottom={scrollToBottom}
      />
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
  & > .flex1 {
    flex: 1;
  }
`;

export default Chat;
