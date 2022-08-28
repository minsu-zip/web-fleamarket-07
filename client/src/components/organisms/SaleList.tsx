import React from 'react';
import { useQuery } from 'react-query';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import Guide from '@components/atoms/Guide';
import Dropdown from '@components/molecules/Dropdown';
import { userMenuAPI } from '@apis/product';
import ProductItem from './ProductItem';
import type { TProductSummary } from '@fleamarket/common';
import { dropDownList } from '@constants/dropDownList';

const SaleList: React.FC = () => {
  const Auth = useRecoilValue(authAtom);

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
  } = useQuery<TProductSummary[]>(
    'saleList',
    () => userMenuAPI({ userId: Auth?.id }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  if (isError) return <Guide.Error />;

  if (isLoading) return <Guide.Loading />;

  if (!userSaleList || userSaleList.length === 0) return <Guide.Empty />;

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
