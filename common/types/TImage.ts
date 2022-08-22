import { TProduct } from './product';

type TImage = {
  id: number;
  url: string;
  productId: Pick<TProduct, 'id'>;
};

export default TImage;
