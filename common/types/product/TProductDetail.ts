import TProduct from './TProduct';
import { EProductStatus } from './EProductStatus';
import TImage from '../TImage';

type TProductDetail = TProduct & {
  content?: string;
  categoryId: number;
  categoryName: string;
  status: EProductStatus;
  images?: TImage[];
};

export default TProductDetail;
