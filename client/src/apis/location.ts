import { axiosAuth } from './util';
import { TLocation, TLocationCreate } from '@fleamarket/common';

export const createLocationAPI = async ({
  region,
}: TLocationCreate): Promise<TLocation[]> => {
  const response = await axiosAuth.post(`location`, { region });

  const status = Math.floor(response.status / 100) * 100;

  if (status !== 200) throw response;

  const { locations } = response.data;

  return locations;
};
