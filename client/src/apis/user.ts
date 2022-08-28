import { TLocation } from '@fleamarket/common';
import { axiosAuth } from './util';

export const getUserAPI = async (name: string) => {
  try {
    const userInfo = await axiosAuth.get(`user/${name}`);
    const status = Math.floor(userInfo.status / 100) * 100;

    if (status === 200) {
      return userInfo.data;
    } else {
      throw new Error('잘못된 응답값입니다.');
    }
  } catch (error) {
    console.error(error);
  }
};

export const logoutAPI = async () => {
  try {
    await axiosAuth.post(
      'user/logout',
      {},
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error('로그아웃 실패', error);
  }
};

export const getUserLocationAPI = async (
  userId: number | undefined,
): Promise<TLocation[]> => {
  try {
    if (!userId) return [];
    const userLocationList = await axiosAuth.get(`user/userLocation/${userId}`);

    const status = Math.floor(userLocationList.status / 100) * 100;

    if (status === 200) {
      const { data } = userLocationList;

      const { location1Id, location1Name, location2Id, location2Name } =
        data[0];

      const newLocation = [
        { id: location1Id, region: location1Name },
        { id: location2Id, region: location2Name },
      ];
      const filterLocation = newLocation.filter(
        ({ id, region }) => id && region,
      );

      return filterLocation;
    } else {
      throw new Error('잘못된 응답값입니다.');
    }
  } catch (error) {
    console.error('사용자 정보를 파악할 수 없습니다.', error);

    return [];
  }
};
