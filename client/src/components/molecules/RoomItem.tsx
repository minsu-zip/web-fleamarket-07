import React from 'react';
import styled from '@emotion/styled';
import Badge from '@mui/material/Badge';
import { getTimeGapString } from '@utils/time';
import ImageBox, { EImageSize } from '@components/molecules/ImageBox';
import {
  COLOR,
  TEXT_LINK_SMALL,
  TEXT_SMALL,
  TEXT_X_SMALL,
} from '@constants/style';
import { css } from '@emotion/css';
import { TRoomReceive } from '@fleamarket/common';
import { useNavigate } from 'react-router-dom';
import { SLIDE_STATE } from '@constants/slideStyle';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';

interface IProps {
  roomInfo: TRoomReceive;
}

const RoomItem: React.FC<IProps> = ({ roomInfo }) => {
  const navigate = useNavigate();
  const Auth = useRecoilValue(authAtom);
  const { product, buyer, seller, lastChat, buyerId } = roomInfo;
  const { content: lastContent, createdAt: lastCreatedAt } = lastChat || {};

  const isSeller = Auth?.id === seller.id;
  const queryString = isSeller ? `?buyer=${buyerId}` : '';

  return (
    <ContainerDiv
      onClick={() =>
        navigate(`/chat/${product.id}${queryString}`, {
          state: { animate: SLIDE_STATE.LEFT },
        })
      }
    >
      <div style={{ marginLeft: '24px' }}>
        <div
          className={css`
            ${TEXT_LINK_SMALL}
          `}
        >
          {isSeller ? buyer.name : seller.name}
          {isSeller ? ' (판매자)' : ' (구매자)'}
        </div>
        <ContentDiv>{lastContent ?? ''}</ContentDiv>
      </div>

      <RightWrapperDiv>
        <TimeDiv>{getTimeGapString(lastCreatedAt ?? 0)}</TimeDiv>
        <div aria-label={notificationsLabel(100)}>
          <Badge badgeContent={100} color='primary'>
            <ImageBox
              type={EImageSize.small}
              src={product.titleImage.url}
            ></ImageBox>
          </Badge>
        </div>
      </RightWrapperDiv>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLOR.line};
  height: 72px;
`;

const ContentDiv = styled.div`
  ${TEXT_SMALL};
  height: 1rem;
  color: ${COLOR.background2};
  margin-top: 6px;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TimeDiv = styled.div`
  ${TEXT_X_SMALL};
  color: ${COLOR.background2};
  margin: 3px 12px 0 0;
`;

const RightWrapperDiv = styled.div`
  display: flex;
  margin-right: 24px;
`;

function notificationsLabel(count: number) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }

  return `${count} notifications`;
}

export default RoomItem;
