import TProduct from './TProduct';
import TImage from '../TImage';

type TProductSummary = Omit<
  TProduct,
  'content' | 'hit' | 'status' | 'categoryId'
> & {
  titleImage?: TImage['url'];
  likes: number;
  isLike: boolean;
  chats: number;
  locationName: string;
  userName: string;
};

export default TProductSummary;
