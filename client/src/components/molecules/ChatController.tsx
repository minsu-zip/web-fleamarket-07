import React from 'react';
import styled from '@emotion/styled';
import { TChatReceive } from '@fleamarket/common';
import { useRecoilValue } from 'recoil';
import { ChatControllerAtom } from '@stores/Chat';

interface IProps {
  lastChat: TChatReceive;
  scrollToBottom: (options?: ScrollIntoViewOptions) => void;
}

const ChatController: React.FC<IProps> = ({ lastChat, scrollToBottom }) => {
  const { content } = lastChat;
  const isOpen = useRecoilValue(ChatControllerAtom);

  return (
    <ContainerDiv isOpen={isOpen}>
      <div
        className='wrapper'
        onClick={() =>
          scrollToBottom({
            behavior: 'smooth',
          })
        }
      >
        <span>{content}</span>
      </div>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div<{ isOpen: boolean }>`
  width: 100%;
  flex: 0 0 auto;

  position: relative;

  & > .wrapper {
    width: 100%;
    height: 3rem;
    padding: 1rem;

    left: 0;
    bottom: 0;
    position: absolute;

    background-color: white;
    ${({ isOpen }) =>
      isOpen
        ? `
      cursor: pointer;
      opacity: 0.9;
    `
        : `
      opacity: 0;
    `}
    transition: opacity 0.3s;
  }
`;

export default ChatController;
