import React from 'react';
import { TChatReceive } from '@fleamarket/common';
import styled from '@emotion/styled';
import ChatItem from '@components/molecules/ChatItem';
import { SCROLLBAR_THUMB } from '@constants/style';

interface IProps {
  chats: TChatReceive[];
}

const ChatList: React.FC<IProps> = ({ chats }) => {
  return (
    <ContainerDiv>
      {chats.map((item) => {
        const { id } = item;

        return <ChatItem chat={item} key={id} />;
      })}
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
`;

export default ChatList;
