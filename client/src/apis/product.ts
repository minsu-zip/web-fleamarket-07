import { axiosAuth, axiosAPI } from './util';
import {
  TProductAllQuery,
  TProductSummary,
  TProductDetail,
  TProductCreate,
} from '@fleamarket/common';

export const getProductAllAPI = async ({
  locationId,
  categoryId,
}: TProductAllQuery): Promise<TProductSummary[]> => {
  const locationQuery = `locationId=${locationId}`;
  const categoryQuery = categoryId ? `&categoryId=${categoryId}` : '';

  const response = await axiosAuth.get(
    `product?${locationQuery}${categoryQuery}`,
  );
  const status = Math.floor(response.status / 100) * 100;

  if (status !== 200) throw response;

  const { products } = response.data;

  return products;
};

export const userSaleListAPI = async (
  userId?: number,
): Promise<TProductSummary[]> => {
  if (!userId) return [];

  const response = await axiosAuth.get(`product/saleList/${userId}`);
  const status = Math.floor(response.status / 100) * 100;

  if (status !== 200) {
    throw new Error('잘못된 응답값입니다.');
  }

  const { userSaleList } = response.data;

  return userSaleList;
};

export const userLikeListAPI = async (
  userId?: number,
): Promise<TProductSummary[]> => {
  const response = await axiosAuth.get(`product/likeList/${userId}`);
  const status = Math.floor(response.status / 100) * 100;

  if (status !== 200) {
    throw new Error('잘못된 응답값입니다.');
  }

  const { userLikeList } = response.data;

  return userLikeList;
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
  const response = await axiosAPI.post(`product`, newProduct, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  console.log('응닶', response);
};
