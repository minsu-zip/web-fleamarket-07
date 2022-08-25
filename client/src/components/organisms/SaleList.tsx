import React from 'react';
import { userSaleListAPI } from '@apis/product';
import type { TProductSummary } from '@fleamarket/common';
import ProductItem from './ProductItem';
import { useQuery } from 'react-query';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dropdown from '@components/molecules/Dropdown';

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

  const { data: userSaleList } = useQuery<TProductSummary[]>(
    '',
    () => userSaleListAPI(1),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    },
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

export default SaleList;
