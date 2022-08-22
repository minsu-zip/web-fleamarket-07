import TCategory from 'types/TCategory';
import TLocation from 'types/TLocation';
import TUser from 'types/TUser';
import { EProductStatus } from './EProductStatus';

type TProduct = {
  id: number;
  title: string;
  content: string;
  price: number;
  hit: number;
  status: EProductStatus;
  userId: TUser['id'];
  locationId: TLocation['id'];
  categoryId: TCategory['id'];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export default TProduct;
