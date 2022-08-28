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

  const handleClick = (value: string) => {
    // 함수 로직 작성 나중에 실제 데이터 이용시 수정
    if (value === '수정하기') {
      //
    } else {
      //
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
              <Dropdown dropDownList={dropDownList} handleClick={handleClick}>
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
