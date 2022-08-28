import { TLocation } from '@fleamarket/common';
import { atom } from 'recoil';

const categoryAtom = atom<number>({
  key: 'categoryAtom',
  default: 0,
});

const locationAtom = atom<TLocation[]>({
  key: 'locationAtom',
  default: [
    {
      id: 1,
      region: '역삼동',
    },
  ],
});

export { categoryAtom, locationAtom };
