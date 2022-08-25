import React from 'react';
import styled from '@emotion/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {
  TEXT_LINK_MEDIUM,
  TEXT_SMALL,
  COLOR,
  TEXT_LINK_SMALL,
  TEXT_ELLIPSIS,
} from '@constants/style';
import ImageBox from '@components/molecules/ImageBox';
import type { TProductSummary } from '@fleamarket/common';
import { getTimeGapString } from '@utils/time';
import { useNavigate } from 'react-router-dom';
import { SLIDE_STATE } from '@constants/slideStyle';

const ICON_SIZE = { width: '1.2rem', height: '1.2rem' };

interface IProps extends React.PropsWithChildren {
  product: TProductSummary;
}

const ProductItem: React.FC<IProps> = ({ product, children }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    titleImage,
    price,
    likes,
    rooms,
    locationName,
    createdAt,
  } = product;

  const moveToProduct = () => {
    navigate(`/product/${id}`, { state: { animate: SLIDE_STATE.UP } });
  };

  return (
    <ContainerDiv onClick={moveToProduct}>
      <ImageBox src={titleImage}></ImageBox>
      <ContentDiv>
        <section className='main'>
          <MainInfosDiv>
            <h3 className='title'>{title}</h3>
            <div className='location'>
              {locationName}
              <span>∙</span>
              {getTimeGapString(new Date(createdAt ?? 0))}
            </div>
            <div className='price'>
              {price === 0 ? '무료나눔' : `${price?.toLocaleString()}원`}
            </div>
          </MainInfosDiv>

          <BtnWrapperDiv>{children}</BtnWrapperDiv>
        </section>

        <section className='sub'>
          {rooms > 0 && (
            <>
              <ChatBubbleOutlineIcon sx={ICON_SIZE} />
              <span>{rooms || 0}</span>
            </>
          )}
          {likes > 0 && (
            <>
              <FavoriteBorderIcon sx={ICON_SIZE} />
              <span>{likes}</span>
            </>
          )}
        </section>
      </ContentDiv>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${COLOR.line};
  &:last-child {
    border-bottom: none;
  }

  cursor: pointer;
`;

const ContentDiv = styled.div`
  flex: 1;
  margin-left: 16px;

  display: flex;
  flex-direction: column;

  & > .main {
    flex: 0 0 auto;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  & > .sub {
    ${TEXT_SMALL}
    flex: 1;
    width: 100%;

    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    column-gap: 0.5rem;

    color: ${COLOR.label};
  }
`;

const MainInfosDiv = styled.div`
  flex: 1;
  max-width: 190px;
  padding: 0.4rem 0;

  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;

  & > * {
    ${TEXT_ELLIPSIS}
  }
  & > .title {
    ${TEXT_LINK_MEDIUM}
    margin: 0;
    flex: 1;
  }
  & > .location {
    ${TEXT_SMALL}
    color: ${COLOR.label};
  }
  & > .price {
    ${TEXT_LINK_SMALL}
  }
`;

const BtnWrapperDiv = styled.div`
  flex: 0 0 auto;

  position: relative;
  top: -0.3rem;
  right: -0.5rem;
`;

export default ProductItem;
