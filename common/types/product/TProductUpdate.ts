import EProductStatus from './EProductStatus';
import TImage from '../TImage';

type TProductUpdate = {
  title?: string;
  content?: string;
  price?: number;
  images?: TImage[];
  status?: EProductStatus;
  categoryId?: number;
  isLike?: boolean;
};

export default TProductUpdate;
