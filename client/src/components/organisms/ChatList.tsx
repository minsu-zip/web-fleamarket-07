import React, { useEffect, useRef } from 'react';
import { TChatReceive } from '@fleamarket/common';
import styled from '@emotion/styled';
import ChatItem from '@components/molecules/ChatItem';
import { COLOR, SCROLLBAR_THUMB } from '@constants/style';

interface IProps {
  chats: TChatReceive[];
}

const ChatList: React.FC<IProps> = ({ chats }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (listRef.current)
      listRef.current.scrollIntoView({
        behavior: 'smooth',
      });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <ContainerDiv>
      {chats.map((item) => {
        const { id } = item;

        return <ChatItem chat={item} key={id} />;
      })}
      <div ref={listRef}></div>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  ${SCROLLBAR_THUMB}
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;

  overflow-x: hidden;
  overflow-y: scroll;

  background-color: ${COLOR.background};
`;

export default ChatList;
