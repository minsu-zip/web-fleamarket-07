import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import ChatItem from '@components/molecules/ChatItem';
import { COLOR, SCROLLBAR_THUMB } from '@constants/style';
import { TChatReceive } from '@fleamarket/common';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import { ChatControllerAtom } from '@stores/Chat';

interface IProps {
  chats: TChatReceive[];
  listRef: React.RefObject<HTMLSpanElement>;
  scrollToBottom: (options?: ScrollIntoViewOptions) => void;
}

const ChatList: React.FC<IProps> = ({ chats, listRef, scrollToBottom }) => {
  const Auth = useRecoilValue(authAtom);
  const isFirst = useRef<boolean>(true);
  const setChatController = useSetRecoilState(ChatControllerAtom);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;

      return;
    }
    if (chats[chats.length - 1]?.userId === Auth?.id) {
      scrollToBottom();
    }
  }, [chats, Auth, scrollToBottom]);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    setChatController(Math.abs((e.target as HTMLDivElement).scrollTop) > 100);
  };

  return (
    <ContainerDiv onScroll={handleScroll}>
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
