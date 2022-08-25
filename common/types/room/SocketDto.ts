import { TChatReceive } from 'types/chat';
import { TProduct } from 'types/product';
import { TUser } from 'types/user';
import TRoom from './TRoom';

export type TRoomConnect = {
  authToken: string;
};

export type TRoomEntered = {
  chats: TRoomReceive[];
};

export type TRoomReceive = {
  id: TRoom['id'];
  productId: TProduct['id'];
  sellerId: TUser['id'];
  buyerId: TUser['id'];
  lastChat: TChatReceive;
};
