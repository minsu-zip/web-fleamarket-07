import TCategory from 'types/TCategory';
import { TLocation } from 'types/location';
import { TUser } from 'types/user';
import { EProductStatus } from './EProductStatus';

type TProduct = {
  id: number;
  title: string;
  content: string;
  price: number;
  hit: number;
  status: keyof typeof EProductStatus;
  userId: TUser['id'];
  locationId: TLocation['id'];
  categoryId: TCategory['id'];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export default TProduct;
