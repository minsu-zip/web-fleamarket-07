import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import { userLikeListAPI } from '@apis/product';
import Guide from '@components/atoms/Guide';
import Heart from '@components/molecules/Heart';
import ProductItem from './ProductItem';
import type { TProductSummary } from '@fleamarket/common';

const LikeList: React.FC = () => {
  const Auth = useRecoilValue(authAtom);

  const {
    data: userLikeList,
    isLoading,
    isError,
  } = useQuery<TProductSummary[]>('', () => userLikeListAPI(Auth?.id), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (isError) return <Guide.Error />;

  if (isLoading) return <Guide.Loading />;

  if (!userLikeList || userLikeList.length === 0) return <Guide.Empty />;

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

export default LikeList;
