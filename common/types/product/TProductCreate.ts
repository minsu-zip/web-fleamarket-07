import TImage from '../TImage';

type TProductCreate = {
  title: string;
  content?: string;
  price: number;
  images?: TImage[];
  categoryId: number;
};

export default TProductCreate;
