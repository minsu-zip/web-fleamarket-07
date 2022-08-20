import TImage from '../TImage';

type TProduct = {
  id: number;
  title: string;
  price: number;
  titleImage?: TImage;
  likes: number;
  isLike: boolean;
  chats: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  locationId: number;
  locationName: string;
  userId: number;
  userName: string;
};

export default TProduct;
