import MenuHeader from '@components/molecules/MenuHeader';
import ProductItem from '@components/organisms/ProductItem';
import React from 'react';

const productList = [
  {
    id: 1,
    title: '도자기',
    price: 15555,
    titleImage: undefined,
    likes: 3,
    isLike: true,
    chats: 2,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    locationId: 1,
    locationName: '역삼동',
    userId: 0,
    userName: '',
  },
  {
    id: 2,
    title: '도자기123312',
    price: 0,
    titleImage: undefined,
    likes: 0,
    isLike: true,
    chats: 0,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    locationId: 1,
    locationName: '역삼동',
    userId: 0,
    userName: '',
  },
  {
    id: 3,
    title: '도자기asdsad',
    price: 123123,
    titleImage: undefined,
    likes: 3,
    isLike: false,
    chats: 2,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    locationId: 1,
    locationName: '역삼동',
    userId: 0,
    userName: '',
  },
  {
    id: 3,
    title: '도자기asdsad',
    price: 123123,
    titleImage: undefined,
    likes: 3,
    isLike: false,
    chats: 2,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    locationId: 1,
    locationName: '역삼동',
    userId: 0,
    userName: '',
  },
  {
    id: 3,
    title: '도자기asdsad',
    price: 123123,
    titleImage: undefined,
    likes: 3,
    isLike: false,
    chats: 2,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    locationId: 1,
    locationName: '역삼동',
    userId: 0,
    userName: '',
  },
  {
    id: 3,
    title: '도자기asdsad',
    price: 123123,
    titleImage: undefined,
    likes: 3,
    isLike: false,
    chats: 2,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    locationId: 1,
    locationName: '역삼동',
    userId: 0,
    userName: '',
  },
];

const Main: React.FC = () => {
  return (
    <>
      <MenuHeader />

      {productList.map((item) => (
        <>
          <ProductItem product={item} />
          <br />
        </>
      ))}
    </>
  );
};

export default Main;
