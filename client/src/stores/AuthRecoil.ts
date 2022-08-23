import { atom } from 'recoil';
import { TUserGithub } from '@fleamarket/common';

const authAtom = atom<TUserGithub | null>({
  key: 'authAtom',
  default: null,
});

export { authAtom };
