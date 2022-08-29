import React from 'react';
import { userMenuAPI } from '@apis/product';
import type { TProductSummary } from '@fleamarket/common';
import ProductItem from './ProductItem';
import { useQuery } from 'react-query';
import Guide from '@components/atoms/Guide';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import Heart from '@components/molecules/Heart';

const LikeList: React.FC = () => {
  const Auth = useRecoilValue(authAtom);

  const {
    data: userLikeList,
    isLoading,
    isError,
  } = useQuery<TProductSummary[]>(
    'likeList',
    () => userMenuAPI({ userId: Auth?.id, likeStatus: true }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

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
