import EProductStatus from './EProductStatus';

type TProduct = {
  id: number;
  title: string;
  content: string;
  price: number;
  hit: number;
  status: EProductStatus;
  userId: number;
  locationId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export default TProduct;
