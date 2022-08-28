import React from 'react';
import { useQuery } from 'react-query';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import Guide from '@components/atoms/Guide';
import Dropdown from '@components/molecules/Dropdown';
import { deleteProductAPI, userMenuAPI } from '@apis/product';
import ProductItem from './ProductItem';
import type { TProductSummary } from '@fleamarket/common';
import { dropDownList } from '@constants/dropDownList';

const SaleList: React.FC = () => {
  const Auth = useRecoilValue(authAtom);

  const {
    data: userSaleList,
    isLoading,
    isError,
    refetch,
  } = useQuery<TProductSummary[]>('', () => userMenuAPI({ userId: Auth?.id }), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const handleClick = async (value: string, productId: string) => {
    if (value === '삭제하기') {
      await deleteProductAPI(Number(productId));
      refetch();
    }
  };

  if (isError) return <Guide.Error />;

  if (isLoading) return <Guide.Loading />;

  if (!userSaleList || userSaleList.length === 0) return <Guide.Empty />;

  return (
    <>
      {userSaleList?.map((product) => (
        <ProductItem key={product.id} product={product}>
          <Dropdown
            id={String(product.id)}
            dropDownList={dropDownList}
            handleClick={handleClick}
          >
            <MoreVertIcon />
          </Dropdown>
        </ProductItem>
      ))}
    </>
  );
};

export default SaleList;
