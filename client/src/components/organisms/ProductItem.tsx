import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {
  TEXT_LINK_MEDIUM,
  TEXT_SMALL,
  TEXT_LINK_SMALL,
  COLOR,
} from '@constants/style';
import Heart from '@components/molecules/Heart';
import ImageBox from '@components/atoms/ImageBox';
import type { TProductSummary } from '@fleamarket/common';

interface IProps {
  product: TProductSummary;
}

const ProductItem: React.FC<IProps> = ({ product }) => {
  const { title, titleImage, price, isLike, likes, chats, locationName } =
    product;

  return (
    <ContainerDiv>
      <ImageBox src={titleImage}></ImageBox>
      <ContentDiv>
        <TopWrapperDiv>
          <TitleSpan
            className={css`
              ${TEXT_LINK_MEDIUM}
            `}
          >
            {title}
          </TitleSpan>

          <Heart isLike={isLike}></Heart>
        </TopWrapperDiv>

        <div>
          <span
            className={css`
              ${TEXT_SMALL}
            `}
          >
            {locationName} {`∙ 2분전`}
          </span>
        </div>

        <div style={{ paddingTop: '8px' }}>
          <span
            className={css`
              ${TEXT_LINK_SMALL}
            `}
          >
            {price === 0 ? '무료나눔' : `${price?.toLocaleString()}원`}
          </span>
        </div>

        <IconDiv>
          {chats > 0 && (
            <ChatWrapperDiv
              className={css`
                ${TEXT_SMALL}
              `}
            >
              <ChatBubbleOutlineIcon />
              <span>{chats}</span>
            </ChatWrapperDiv>
          )}

          {likes > 0 && (
            <ChatWrapperDiv
              className={css`
                ${TEXT_SMALL}
              `}
            >
              <FavoriteBorderIcon />
              <span>{likes}</span>
            </ChatWrapperDiv>
          )}
        </IconDiv>
      </ContentDiv>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  padding: 16px;
  width: 100%;
  border-bottom: 1px solid ${COLOR.placeholder};
`;

const ContentDiv = styled.div`
  flex: 1;
  padding-left: 16px;
`;

const TopWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${COLOR.background2};
`;

const TitleSpan = styled.span`
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ChatWrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 18px;
`;
export default ProductItem;
