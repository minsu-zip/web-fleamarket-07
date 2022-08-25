import { userSaleListAPI } from '@apis/product';
import TopBar from '@components/molecules/TopBar';
import Tap from '@components/organisms/Tap';
import { Button } from '@mui/material';
import React from 'react';

const Menu: React.FC = () => {
  return (
    <>
      <TopBar title='메뉴' />
      <Tap></Tap>
    </>
  );
};

export default Menu;
