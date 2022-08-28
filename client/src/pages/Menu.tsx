import TopBar from '@components/molecules/TopBar';
import Tap from '@components/organisms/Tap';
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
