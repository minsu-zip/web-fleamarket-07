import { atom } from 'recoil';

const ChatControllerAtom = atom<boolean>({
  key: 'ChatControllerAtom',
  default: false,
});

export { ChatControllerAtom };
