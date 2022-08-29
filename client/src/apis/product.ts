import { axiosAuth } from './util';
import {
  TProductAllQuery,
  TProductSummary,
  TProductDetail,
} from '@fleamarket/common';

export const getProductAllAPI = async ({
  locationId,
  categoryId,
}: TProductAllQuery): Promise<TProductSummary[]> => {
  const locationQuery = `locationId=${locationId ? locationId : ''}`;
  const categoryQuery = `&categoryId=${categoryId !== 0 ? categoryId : ''}`;

  const response = await axiosAuth.get(
    `product?${locationQuery}${categoryQuery}`,
  );
  const status = Math.floor(response.status / 100) * 100;

  if (status !== 200) throw response;

  const { products } = response.data;

  return products;
};

export const userMenuAPI = async ({
  locationId,
  userId,
  likeStatus,
}: TProductAllQuery): Promise<TProductSummary[]> => {
  const locationQuery = `locationId=${locationId ? locationId : ''}`;
  const userQuery = `&userId=${userId ? userId : ''}`;
  const likeStateQuery = `&likeStatus=${likeStatus ? 'true' : ''}`;

  const response = await axiosAuth.get(
    `product/menu?${locationQuery}${userQuery}${likeStateQuery}`,
  );
  const status = Math.floor(response.status / 100) * 100;

  if (status !== 200) {
    throw new Error('잘못된 응답값입니다.');
  }

  const { products } = response.data;

  return products;
};

export const getProductDetailAPI = async ({
  productId,
}: {
  productId?: string;
}): Promise<TProductDetail> => {
  const response = await axiosAuth.get(`product/${productId}`);

  const status = Math.floor(response.status / 100) * 100;
  if (status !== 200) throw response;

  const { product } = response.data;

  return product;
};

export const createProductAPI = async (newProduct: FormData) => {
  await axiosAuth.post(`product`, newProduct, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProductAPI = async (id: number) => {
  try {
    await axiosAuth.delete(`product/${id}`);
  } catch (error) {
    console.error('상품 삭제에 실패했습니다.', error);
  }
};

export const likeProductAPI = async ({
  productId,
}: {
  productId: number;
}): Promise<boolean> => {
  const response = await axiosAuth.patch(`product/like/${productId}`);

  const status = Math.floor(response.status / 100) * 100;

  if (status !== 200) throw response;

  const { isLike } = response.data;

  return isLike;
};
