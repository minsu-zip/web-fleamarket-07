import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Heart from '@components/molecules/Heart';
import TopBar from '@components/molecules/TopBar';
import {
  deleteProductAPI,
  getProductDetailAPI,
  likeProductAPI,
} from '@apis/product';
import Guide from '@components/atoms/Guide';
import { COLOR, SCROLLBAR_THUMB, TEXT_LINK_SMALL } from '@constants/style';
import type { TProductDetail } from '@fleamarket/common';
import ProductContent from '@components/organisms/ProductContent';
import { SLIDE_STATE } from '@constants/slideStyle';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import Dropdown from '@components/molecules/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { dropDownList } from '@constants/dropDownList';

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const Auth = useRecoilValue(authAtom);

  const detailQuery = [`detail`, productId];
  const {
    isLoading,
    isError,
    data: details,
  } = useQuery<TProductDetail>(
    detailQuery,
    () => getProductDetailAPI({ productId }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  const queryClient = useQueryClient();

  const likeClick = (pid: number) => () => {
    const snapshot = queryClient.getQueriesData<TProductDetail>(detailQuery);
    const productSnap = snapshot[0][1];
    likeProductAPI({ productId: pid });

    queryClient.setQueryData(detailQuery, {
      ...productSnap,
      isLike: !productSnap?.isLike,
    });
  };

  const handleClick = async (value: string) => {
    if (value === '삭제하기') {
      await deleteProductAPI(Number(productId));
      navigate('/');
    }
  };

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

  const { price, isLike } = details;

  return (
    <ContainerDiv>
      <nav className='head'>
        <TopBar
          background={
            'linear-gradient(rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 87.36%)'
          }
        >
          {details.userId === Auth?.id ? (
            <Dropdown dropDownList={dropDownList} handleClick={handleClick}>
              <MoreVertIcon />
            </Dropdown>
          ) : null}
        </TopBar>
      </nav>
      <div className='body'>
        <ProductContent details={details} authId={Auth?.id} />
      </div>
      <footer className='foot'>
        {details.userId === Auth?.id ? (
          <PriceSpan>{price.toLocaleString()}원</PriceSpan>
        ) : (
          <>
            <Heart isLike={!!isLike} onClick={likeClick(details.id)} />
            <PriceSpan>{price.toLocaleString()}원</PriceSpan>
            <ChatButton
              variant='contained'
              onClick={() =>
                navigate(`/chat/${productId}`, {
                  state: { animate: SLIDE_STATE.LEFT },
                })
              }
            >
              문의하기
            </ChatButton>
          </>
        )}
      </footer>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  height: 100%;
  padding: 0;

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
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-gutter: stable;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: ${COLOR.background};
    }
    @media screen and (min-width: 520px) {
      &:hover {
        &::-webkit-scrollbar {
          width: 3px;
          height: 3px;
          background-color: ${COLOR.background};
        }
        &::-webkit-scrollbar-thumb {
          width: 3px;
          height: 3px;
          background-color: ${COLOR.title};
        }
      }
    }

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

    border-top: 1px solid ${COLOR.line};

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
  ${SCROLLBAR_THUMB}
  ${TEXT_LINK_SMALL}
  margin: 0 1rem;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  white-space: nowrap;
  scrollbar-width: none;
`;

export default ProductDetail;
