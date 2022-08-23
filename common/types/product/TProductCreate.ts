import TImage from '../TImage';
import TProduct from './TProduct';

type TProductCreate = Pick<
  TProduct,
  'title' | 'content' | 'price' | 'categoryId'
> & {
  images?: TImage[];
};

export default TProductCreate;
