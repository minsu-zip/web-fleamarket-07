import EProductStatus from './EProductStatus';

type Timage = {
  image: string;
};

type TProduct = {
  id: number;
  title: string;
  price?: number;
  hit?: number;
  titleImage?: Timage;
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

type TProductDetail = TProduct & {
  content?: string;
  categoryId: number;
  categoryName: string;
  status: EProductStatus;
  images?: Timage[];
};

type TProductCreate = {
  title: string;
  content?: string;
  price: number;
  images?: Timage[];
  categoryId: number;
};

type TProductUpdate = {
  title?: string;
  content?: string;
  price?: number;
  images?: Timage[];
  status?: EProductStatus;
  categoryId?: number;
  isLike?: boolean;
};

export { TProduct, TProductDetail, TProductCreate, TProductUpdate };
