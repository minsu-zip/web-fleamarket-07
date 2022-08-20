import TProduct from './TProduct';
import { EProductStatus } from './EProductStatus';
import TImage from '../TImage';

type TProductDetail = TProduct & {
  content?: string;
  categoryId: number;
  categoryName: string;
  status: EProductStatus;
  hits: number;
  images?: TImage[];
};

export default TProductDetail;
