import React from 'react';
import { likeProductAPI, userMenuAPI } from '@apis/product';
import type { TProductSummary } from '@fleamarket/common';
import ProductItem from './ProductItem';
import { useQuery, useQueryClient } from 'react-query';
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

  const queryClient = useQueryClient();

  const likeClick = (pid: number) => () => {
    const snapshot = queryClient.getQueriesData<TProductSummary[]>('likeList');
    const newProducts = [...snapshot[0][1]];
    const index = newProducts.findIndex(({ id }) => id === pid);
    const isLike = !newProducts[index].isLike;
    likeProductAPI({ productId: pid });

    queryClient.setQueryData(
      'likeList',
      newProducts.filter((_, i) => i !== index || isLike),
    );
  };

  if (isError) return <Guide.Error />;

  if (isLoading) return <Guide.Loading />;

  if (!userLikeList || userLikeList.length === 0) return <Guide.Empty />;

  return (
    <>
      {userLikeList?.map((product) => (
        <ProductItem key={product.id} product={product}>
          <Heart
            isLike={!!product.isLike}
            onClick={likeClick(product.id)}
          ></Heart>
        </ProductItem>
      ))}
    </>
  );
};

export default LikeList;
