import React from 'react';
import { useQuery } from 'react-query';
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
import { deleteProductAPI, getProductAllAPI } from '@apis/product';
import { categoryAtom, locationAtom } from '@stores/ActionInfoRecoil';
import { authAtom } from '@stores/AuthRecoil';
import type { TProductSummary } from '@fleamarket/common';

const Main: React.FC = () => {
  const currentCategory = useRecoilValue(categoryAtom);
  const Auth = useRecoilValue(authAtom);
  const locations = useRecoilValue(locationAtom);
  const currentLocation = locations[0].id;

  const {
    isLoading,
    isError,
    refetch,
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
              <Heart isLike={!!product.isLike}></Heart>
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
