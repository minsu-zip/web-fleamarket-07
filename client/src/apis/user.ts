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