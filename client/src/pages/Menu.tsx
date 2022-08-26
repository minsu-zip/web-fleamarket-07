import TopBar from '@components/molecules/TopBar';
import Tap from '@components/organisms/Tap';
import styled from '@emotion/styled';
import React from 'react';

const Menu: React.FC = () => {
  return (
    <ContainerDiv>
      <TopBar title='메뉴' />
      <Tap></Tap>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default Menu;
