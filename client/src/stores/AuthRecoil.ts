import { atom } from 'recoil';
import { TUserGithub } from '@fleamarket/common';
import { getCookie } from '@utils/cookie';
import jwt_decode from 'jwt-decode';

const authToken = getCookie('auth');
const decoded: TUserGithub | null = authToken ? jwt_decode(authToken) : null;

const authAtom = atom<TUserGithub | null>({
  key: 'authAtom',
  default: decoded,
});

export { authAtom };
