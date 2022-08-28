import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { authAtom } from '@stores/AuthRecoil';
import { getTimeString } from '@utils/time';
import { COLOR, TEXT_LINK_SMALL } from '@constants/style';
import { TChatReceive } from '@fleamarket/common';
import { Paper } from '@mui/material';

interface IProps {
  chat: TChatReceive;
  beforeChat: TChatReceive;
}

const ChatItem: React.FC<IProps> = ({ chat, beforeChat }) => {
  const Auth = useRecoilValue(authAtom);
  const { userId, content, createdAt } = chat;
  const { userId: afterUserId, createdAt: afterCreatedAt } = beforeChat ?? {};
  const isMe = Auth?.id === userId;
  const timeString = getTimeString(createdAt);
  const isUserDiff = userId !== afterUserId;
  const showTime = timeString !== getTimeString(afterCreatedAt) || isUserDiff;

  return (
    <ContainerSpan isMe={isMe}>
      <Paper className='content' elevation={2} square>
        <p>{content}</p>
      </Paper>
      {showTime && <TimeDiv>{timeString}</TimeDiv>}
    </ContainerSpan>
  );
};

const ContainerSpan = styled.span<{ isMe: boolean }>`
  ${TEXT_LINK_SMALL}
  width: 100%;
  line-height: 1.25rem;

  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};

  & > .content {
    margin-left: ${({ isMe }) => (isMe ? '0' : '2rem')};

    padding: 0.75rem;

    ${({ isMe }) =>
      isMe
        ? `
      border-radius: 8px 0px 8px 8px;
      color: ${COLOR.title};
      background-color: ${COLOR.primary};
    `
        : `
      border-radius: 0px 8px 8px 8px;
      color: ${COLOR.title};
      background-color: ${COLOR.white};
    `}
    & > p {
      margin: 0;
      white-space: pre-wrap;
    }
  }
`;

const TimeDiv = styled.div`
  flex: 0 0 auto;
  margin: 0 0.5rem;
`;

export default ChatItem;
