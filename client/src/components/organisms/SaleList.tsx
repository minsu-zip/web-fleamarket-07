import React from 'react';
import { userSaleListAPI } from '@apis/product';
import type { TProductSummary } from '@fleamarket/common';
import ProductItem from './ProductItem';
import { useQuery } from 'react-query';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown from '@components/molecules/Dropdown';
import Guide from '@components/atoms/Guide';
import styled from '@emotion/styled';

const dropDownList = ['수정하기', '삭제하기'];

const SaleList = () => {
  const handleClick = (value: string) => {
    // 함수 로직 작성 나중에 실제 데이터 이용시 수정
    if (value === '수정하기') {
      //
    } else {
      //
    }
  };

  const {
    data: userSaleList,
    isLoading,
    isError,
  } = useQuery<TProductSummary[]>('', () => userSaleListAPI(3), {
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

  if (!userSaleList || userSaleList.length === 0)
    return (
      <GuideWrapper>
        <Guide.Empty />
      </GuideWrapper>
    );

  return (
    <>
      {userSaleList?.map((product) => (
        <ProductItem key={product.id} product={product}>
          <Dropdown dropDownList={dropDownList} handleClick={handleClick}>
            <MoreVertIcon />
          </Dropdown>
        </ProductItem>
      ))}
    </>
  );
};

const GuideWrapper = styled.div`
  margin-top: 100px;
`;

export default SaleList;
