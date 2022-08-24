import TProduct from './TProduct';
import TImage from '../TImage';
import TLocation from 'types/TLocation';
import { TUser } from 'types/user';
import TCategory from 'types/TCategory';

type TProductDetail = TProduct & {
  images: TImage['url'][];
  userName: TUser['name'];
  locationName: TLocation['region'];
  categoryName: TCategory['name'];
  likes: number;
  isLike: boolean;
  rooms: number;
};

export default TProductDetail;
