import React from 'react';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import MainLayout from '@components/organisms/MainLayout';
import ProductItem from '@components/organisms/ProductItem';
import Guide from '@components/atoms/Guide';
import { COLOR } from '@constants/style';
import type { TProductSummary } from '@fleamarket/common';
import { deleteProductAPI, getProductAllAPI } from '@apis/product';
import Heart from '@components/molecules/Heart';
import { useRecoilValue } from 'recoil';
import { categoryAtom } from '@stores/ActionInfoRecoil';
import { authAtom } from '@stores/AuthRecoil';
import Dropdown from '@components/molecules/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { dropDownList } from '@constants/dropDownList';

const Main: React.FC = () => {
  const currentCategory = useRecoilValue(categoryAtom);
  const Auth = useRecoilValue(authAtom);

  const {
    isLoading,
    isError,
    refetch,
    data: productList,
  } = useQuery<TProductSummary[]>(
    'products',
    () =>
      getProductAllAPI({
        locationId: 1,
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
