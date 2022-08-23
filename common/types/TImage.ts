import { TProduct } from './product';

type TImage = {
  id: number;
  url: string;
  productId: TProduct['id'];
};

export default TImage;
