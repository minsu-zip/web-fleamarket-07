import React from 'react';
import styled from '@emotion/styled';
import { TRoomReceive } from '@fleamarket/common';
import {
  COLOR,
  TEXT_LINK_SMALL,
  TEXT_SMALL,
  TEXT_X_SMALL,
} from '@constants/style';
import ImageBox, { EImageSize } from '@components/molecules/ImageBox';

interface IProps {
  room: TRoomReceive;
}

const ChatRoomInfo: React.FC<IProps> = ({ room }) => {
  const { product } = room;
  const { titleImage, title, price, status } = product;

  return (
    <ContainerDiv>
      <ImageBox src={titleImage.url} type={EImageSize.small} />
      <div className='content'>
        <TitleH3>{title}</TitleH3>
        <PriceDiv>{price}</PriceDiv>
      </div>
      <div className='status'>{status}</div>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-content: center;

  & > .content {
    flex: 1;
    margin: 0 0.5rem;
    overflow: hidden;

    & > * {
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  & > .status {
    ${TEXT_LINK_SMALL}
    flex: 0 0 auto;
    padding: 0.75rem;
    height: 2.5rem;
    border: 1px solid ${COLOR.line};
    border-radius: 8px;
  }
`;

const TitleH3 = styled.h3`
  ${TEXT_SMALL}
  margin: 0.25rem 0;
  color: ${COLOR.titleActive};
`;

const PriceDiv = styled.div`
  ${TEXT_X_SMALL}
  color: ${COLOR.label};
`;

export default ChatRoomInfo;
