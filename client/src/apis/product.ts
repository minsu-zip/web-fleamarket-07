import { axiosAuth } from './util';
import { TProductAllQuery } from '@fleamarket/common';

export const getProductAllAPI = async ({
  locationId,
  categoryId,
}: TProductAllQuery) => {
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
