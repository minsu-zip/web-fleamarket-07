import React from 'react';
import { userLikeListAPI } from '@apis/product';
import type { TProductSummary } from '@fleamarket/common';
import ProductItem from './ProductItem';
import { useQuery } from 'react-query';
import Guide from '@components/atoms/Guide';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import Heart from '@components/molecules/Heart';

const LikeList = () => {
  const Auth = useRecoilValue(authAtom);

  const {
    data: userLikeList,
    isLoading,
    isError,
  } = useQuery<TProductSummary[]>('', () => userLikeListAPI(Auth?.id), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (isError)
    return (
      <GuideWrapper>
        <Guide.Error />
      </GuideWrapper>
    );

  if (isLoading)
    return (
      <GuideWrapper>
        <Guide.Loading />
      </GuideWrapper>
    );

  if (!userLikeList || userLikeList.length === 0)
    return (
      <GuideWrapper>
        <Guide.Empty />
      </GuideWrapper>
    );

  return (
    <>
      {userLikeList?.map((product) => (
        <ProductItem key={product.id} product={product}>
          <Heart isLike={!!product.isLike}></Heart>
        </ProductItem>
      ))}
    </>
  );
};

const GuideWrapper = styled.div`
  margin-top: 100px;
`;

export default LikeList;
