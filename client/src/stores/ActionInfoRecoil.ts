import { atom } from 'recoil';

const categoryAtom = atom<number>({
  key: 'categoryAtom',
  default: 0,
});

export { categoryAtom };
