import React from 'react';
import styled from '@emotion/styled';
import TopBar from '@components/molecules/TopBar';
import SwipeTab from '@components/molecules/SwipeTab';
import LikeList from '@components/organisms/LikeList';
import RoomList from '@components/organisms/RoomList';
import SaleList from '@components/organisms/SaleList';

const Menu: React.FC = () => {
  return (
    <ContainerDiv>
      <TopBar title='메뉴' />
      <SwipeTab>
        <SwipeTab.Panel label={'판매목록'}>
          <SaleList />
        </SwipeTab.Panel>
        <SwipeTab.Panel label={'관심목록'}>
          <LikeList />
        </SwipeTab.Panel>
        <SwipeTab.Panel label={'채팅'}>
          <RoomList />
        </SwipeTab.Panel>
      </SwipeTab>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  & > .container {
    flex: 1;
  }
`;

export default Menu;
