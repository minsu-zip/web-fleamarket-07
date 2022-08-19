import TImage from '../TImage';

type TProduct = {
  id: number;
  title: string;
  price?: number;
  hit?: number;
  titleImage?: TImage;
  likes?: number;
  isLike: false;
  chats?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  locationId: number;
  locationNumber: string;
  userId: number;
  userName: string;
};

export default TProduct;
