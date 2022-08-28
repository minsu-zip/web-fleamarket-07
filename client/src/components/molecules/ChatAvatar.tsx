import React from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import ImageBox, { EImageSize } from './ImageBox';
import { TChatReceive, TRoomReceive, TUser } from '@fleamarket/common';
import styled from '@emotion/styled';
import { COLOR, TEXT_ELLIPSIS, TEXT_LARGE } from '@constants/style';

interface IProps {
  chat: TChatReceive;
  afterChat?: TChatReceive;
  room: TRoomReceive;
}

const ChatAvatar: React.FC<IProps> = ({ room, chat, afterChat }) => {
  const Auth = useRecoilValue(authAtom);
  const { userId } = chat;
  const isMe = Auth?.id === userId;

  const { userId: beforeUserId } = afterChat || {};
  const isShow = beforeUserId !== userId;

  const { buyer, buyerId, seller, sellerId } = room;
  const users = { [buyerId]: buyer, [sellerId]: seller };
  const { avatar, name: userName } = users[userId] as TUser;

  return (
    <>
      {isShow && (
        <ContainerDiv isMe={isMe}>
          <ImageBox type={EImageSize.small} src={avatar} />
          <span>
            {userName}
            {isMe ? ' (나)' : ''}
          </span>
        </ContainerDiv>
      )}
    </>
  );
};

const ContainerDiv = styled.div<{ isMe: boolean }>`
  width: 100%;
  line-height: 1.25rem;

  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};

  & > span {
    ${TEXT_ELLIPSIS}
    ${TEXT_LARGE}
    margin: 0 1rem 0.25rem 1rem;
    font-weight: ${({ isMe }) => (isMe ? 'bold' : 'normal')};
    color: ${({ isMe }) => (isMe ? COLOR.titleActive : COLOR.title)};
  }
`;

export default ChatAvatar;
