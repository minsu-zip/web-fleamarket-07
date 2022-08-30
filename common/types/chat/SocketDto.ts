import { TProduct } from 'types/product';
import { TUser } from 'types/user';
import TRoom from '../room/TRoom';
import TChat from './TChat';

export type TChatConnect = {
  productId: TProduct['id'];
  buyerId?: string;
  authToken: string;
};

export type TChatEntered = {
  chats: TChat[];
};

export type TChatSending = {
  content: string;
};

export type TChatReceive = {
  id: TChat['id'];
  content: TChat['content'];
  userId: TUser['id'];
  createdAt: TChat['createdAt'];
};

export type TChatLeaving = {
  roomId: TRoom['id'];
};
