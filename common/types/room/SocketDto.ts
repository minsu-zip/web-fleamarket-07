import { TChatReceive } from 'types/chat';
import { TProduct } from 'types/product';
import { TUser } from 'types/user';
import TRoom from './TRoom';

export type TRoomConnect = {
  authToken: string;
};

export type TRoomEntered = {
  rooms: TRoomReceive[];
};

export type TRoomReceive = {
  id: TRoom['id'];
  productId: TProduct['id'];
  product: TProduct;
  sellerId: TUser['id'];
  seller: TUser;
  buyerId: TUser['id'];
  buyer: TUser;
  lastChat: TChatReceive;
};

export type TRoomState = {
  [id: number | string]: TRoomReceive;
};
