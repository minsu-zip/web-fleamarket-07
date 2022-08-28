import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import ChatItem from '@components/molecules/ChatItem';
import { COLOR, SCROLLBAR_THUMB } from '@constants/style';
import { TChatReceive } from '@fleamarket/common';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';

interface IProps {
  chats: TChatReceive[];
}

const ChatList: React.FC<IProps> = ({ chats }) => {
  const isFirst = useRef<boolean>(true);
  const Auth = useRecoilValue(authAtom);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (options: ScrollIntoViewOptions = {}) => {
    if (listRef.current) listRef.current.scrollIntoView(options);
  };
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;

      return;
    }
    if (chats[chats.length - 1]?.userId === Auth?.id) {
      scrollToBottom({ behavior: 'smooth' });
    }
  }, [chats, Auth]);

  return (
    <ContainerDiv>
      <span ref={listRef}></span>
      {[...chats].reverse().map((item) => {
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
  flex-direction: column-reverse;
  row-gap: 0.75rem;

  overflow-x: hidden;
  overflow-y: scroll;

  background-color: ${COLOR.background};
`;

export default ChatList;
