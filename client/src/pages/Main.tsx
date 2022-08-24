import React from 'react';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import MainLayout from '@components/organisms/MainLayout';
import ProductItem from '@components/organisms/ProductItem';
import Guide from '@components/atoms/Guide';
import { COLOR } from '@constants/style';
import type { TProductSummary } from '@fleamarket/common';
import { getProductAllAPI } from '@apis/product';
import Heart from '@components/molecules/Heart';

const Main: React.FC = () => {
  // 1. TODO : Location ID 를 동적으로 관리하기
  // 2. TODO : Category ID 를 넣어줄 수 있기
  const {
    isLoading,
    isError,
    data: productList,
  } = useQuery<TProductSummary[]>(
    'products',
    () => getProductAllAPI({ locationId: 1 }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  if (isError)
    return (
      <MainLayout backgroundColor={COLOR.background}>
        <Guide.Error />
      </MainLayout>
    );

  if (isLoading)
    return (
      <MainLayout>
        <Guide.Loading />
      </MainLayout>
    );

  if (!productList || productList.length === 0)
    return (
      <MainLayout backgroundColor={COLOR.background}>
        <Guide.Empty />
      </MainLayout>
    );

  return (
    <MainLayout>
      <ContentWrapperDiv id='item'>
        {productList.map((product) => (
          <ProductItem key={product.id} product={product}>
            <Heart isLike={!!product.isLike}></Heart>
          </ProductItem>
        ))}
      </ContentWrapperDiv>
      <MainLayout.FAB />
    </MainLayout>
  );
};

const ContentWrapperDiv = styled.div`
  flex: 1;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

export default Main;
