import MenuHeader from '@components/organisms/MenuHeader';
import ProductItem from '@components/organisms/ProductItem';
import React from 'react';
import styled from '@emotion/styled';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { COLOR } from '@constants/style';

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
  const navigate = useNavigate();

  return (
    <ContainerDiv>
      <MenuHeader />
      <ItemWrapperDiv id='item'>
        {productList.map((item) => (
          <ProductItem product={item} />
        ))}
      </ItemWrapperDiv>
      <FabWrapper color='primary' onClick={() => navigate('newPRoduct')}>
        <AddIcon />
      </FabWrapper>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  overflow: none;

  &:hover > #item::-webkit-scrollbar-thumb {
    background-color: ${COLOR.title};
  }
`;

const ItemWrapperDiv = styled.div`
  flex: 1;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

const FabWrapper = styled(Fab)({
  position: 'absolute',
  right: '1rem',
  bottom: '1rem',
});

export default Main;
