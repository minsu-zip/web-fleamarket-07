import TLocation from '../TLocation';
import TCategory from '../TCategory';
import { TUser } from 'types/user';
import TProduct from './TProduct';

type TProductAllQuery = {
  locationId?: TLocation['id'];
  categoryId?: TCategory['id'];
  userId?: TUser['id'];
  likeStatus?: boolean;
};

export default TProductAllQuery;
