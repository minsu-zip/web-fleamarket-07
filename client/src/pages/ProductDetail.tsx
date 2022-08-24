import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Heart from '@components/molecules/Heart';
import TopBar from '@components/molecules/TopBar';
import { getProductDetailAPI } from '@apis/product';
import Guide from '@components/atoms/Guide';
import { COLOR, TEXT_LINK_SMALL } from '@constants/style';
import type { TProductDetail } from '@fleamarket/common';
import Carousel from 'react-material-ui-carousel';
import ImageBox, { EImageSize } from '@components/molecules/ImageBox';

const ProductDetail: React.FC = () => {
  const { id: productId } = useParams();
  const {
    isLoading,
    isError,
    data: details,
  } = useQuery<TProductDetail>(
    `detail-${productId}`,
    () => getProductDetailAPI({ productId }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  console.log(details);
  if (isError)
    return (
      <ContainerDiv>
        <TopBar />
        <Guide.Error />
      </ContainerDiv>
    );

  const isDetailEmpty = !Object.keys(details || {}).length;
  if (isLoading || isDetailEmpty || !details)
    return (
      <ContainerDiv backgroundColor={COLOR.background}>
        <TopBar />
        <Guide.Loading />
      </ContainerDiv>
    );

  console.log(isLoading, isDetailEmpty, details);
  const { price, isLike, images } = details;

  return (
    <ContainerDiv>
      <nav className='head'>
        <TopBar
          background={
            'linear-gradient(rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 87.36%)'
          }
        />
      </nav>
      <div className='body'>
        <Carousel
          className='carousel'
          indicatorContainerProps={{
            style: {
              marginTop: '-40px',
              paddingBottom: '18px',
              zIndex: 10000,
              position: 'relative',
            },
          }}
        >
          {images?.map((url, index: number) => (
            <ImageBox
              key={index}
              src={url}
              alt={'products'}
              type={EImageSize.full}
            />
          ))}
        </Carousel>
        <div>1</div>
      </div>
      <footer className='foot'>
        <Heart isLike={!!isLike} />
        <PriceSpan>{price.toLocaleString()}원</PriceSpan>
        <ChatButton variant='contained'>문의하기</ChatButton>
      </footer>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${({ backgroundColor }) => `background-color: ${backgroundColor};` ?? ''}

  & > .head {
    width: 100%;
    position: absolute;
    z-index: 100;
  }
  & > .body {
    width: 100%;
    flex: 1;
    & .carousel > div > div > div {
      height: 412px !important;
    }
  }
  & > .foot {
    width: 100%;
    padding: 1rem;
    flex: 0 0 auto;
    position: relative;

    display: flex;
    align-items: flex;

    & > div:first-of-type {
      padding-right: 1rem;
      border-right: 1px solid ${COLOR.line};
    }
  }
`;

const ChatButton = styled(Button)`
  flex: 0 0 auto;
  width: 136px;
  height: 100%;
`;

const PriceSpan = styled.span`
  ${TEXT_LINK_SMALL};
  margin: 0 1rem;
  overflow-x: scroll;
  overflow-y: hidden;

  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  white-space: nowrap;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background-color: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: ${COLOR.title};
    }
  }
`;

export default ProductDetail;
