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
import { useRecoilValue } from 'recoil';
import { categoryAtom, locationAtom } from '@stores/ActionInfoRecoil';

const Main: React.FC = () => {
  const currentCategory = useRecoilValue(categoryAtom);
  const locations = useRecoilValue(locationAtom);
  const currentLocation = locations[0].id;

  const {
    isLoading,
    isError,
    data: productList,
  } = useQuery<TProductSummary[]>(
    ['products', currentLocation],
    () =>
      getProductAllAPI({
        locationId: currentLocation,
        categoryId: currentCategory,
      }),
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
        <MainLayout.FAB />
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
