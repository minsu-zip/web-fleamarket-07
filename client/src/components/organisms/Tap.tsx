import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { COLOR } from '@constants/style';
import React, { useState } from 'react';

import SaleList from './SaleList';
import RoomList from './RoomList';
import LikeList from './LikeList';
import styled from '@emotion/styled';
import { css } from '@emotion/css';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      className={
        value === index
          ? css`
              height: 100%;
            `
          : ''
      }
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const Tap = () => {
  const theme = useTheme();
  const [value, setValue] = useState(2);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <ContainerDiv>
      <AppBar position='static'>
        <Tabs
          sx={{ backgroundColor: COLOR.background }}
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { backgroundColor: COLOR.body } }}
          textColor='inherit'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='판매목록' />
          <Tab label='관심목록' />
          <Tab label='채팅' />
        </Tabs>
      </AppBar>
      <SwipeableViews
        className='content'
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SaleList />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <LikeList />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <RoomList />
        </TabPanel>
      </SwipeableViews>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  & > .content {
    flex: 1;
  }
`;

export default Tap;
