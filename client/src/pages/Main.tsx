import React, { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import MainLayout from '@components/organisms/MainLayout';
import ProductItem from '@components/organisms/ProductItem';
import Guide from '@components/atoms/Guide';
import { COLOR, SCROLLBAR_THUMB } from '@constants/style';
import Heart from '@components/molecules/Heart';
import Dropdown from '@components/molecules/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { dropDownList } from '@constants/dropDownList';
import {
  deleteProductAPI,
  getProductAllAPI,
  likeProductAPI,
} from '@apis/product';
import { categoryAtom, locationAtom } from '@stores/ActionInfoRecoil';
import { authAtom } from '@stores/AuthRecoil';
import type { TProductSummary } from '@fleamarket/common';

const Main: React.FC = () => {
  const clickedLike = useRef<boolean>(false);
  const currentCategory = useRecoilValue(categoryAtom);
  const Auth = useRecoilValue(authAtom);
  const locations = useRecoilValue(locationAtom);
  const currentLocation = locations[0].id;

  const productQueryKey = ['products', currentLocation];
  const {
    isLoading,
    isError,
    refetch,
    data: productList,
  } = useQuery<TProductSummary[]>(
    productQueryKey,
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

  const queryClient = useQueryClient();

  const likeClick = (pid: number) => () => {
    const snapshot =
      queryClient.getQueriesData<TProductSummary[]>(productQueryKey);
    const newProducts = [...snapshot[0][1]];
    const index = newProducts.findIndex(({ id }) => id === pid);
    const newData = {
      ...newProducts[index],
      isLike: !newProducts[index].isLike,
    };
    likeProductAPI({ productId: pid });

    newProducts[index] = newData;
    queryClient.setQueryData(productQueryKey, newProducts);
    clickedLike.current = true;
  };

  useEffect(() => {
    return () => {
      if (clickedLike.current) {
        refetch();
      }
    };
  }, [refetch]);

  const handleClick = async (value: string, productId: string) => {
    if (value === '삭제하기') {
      await deleteProductAPI(Number(productId));
      refetch();
    }
  };

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
            {product.userId === Auth?.id ? (
              <Dropdown
                id={String(product.id)}
                dropDownList={dropDownList}
                handleClick={handleClick}
              >
                <MoreVertIcon />
              </Dropdown>
            ) : (
              <Heart
                isLike={!!product.isLike}
                onClick={likeClick(product.id)}
              ></Heart>
            )}
          </ProductItem>
        ))}
      </ContentWrapperDiv>
      <MainLayout.FAB />
    </MainLayout>
  );
};

const ContentWrapperDiv = styled.div`
  ${SCROLLBAR_THUMB}
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export default Main;
