import type { TProduct } from './product';
import type { TUser } from './user';

type TRoom = {
  id: number;
  productId: TProduct['id'];
  sellerId: TUser['id'];
  buyerId: TUser['id'];
};

export default TRoom;
