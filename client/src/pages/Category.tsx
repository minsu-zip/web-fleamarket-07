import TopBar from '@components/molecules/TopBar';
import CategortItem from '@components/organisms/CategoryItem';
import { Grid } from '@mui/material';
import React from 'react';
import { categoryList } from '@constants/categoryList';

const Category: React.FC = () => {
  // 카테고리 탭에 온 상황에 현재 어느 카테고리인지 받아오는 props나 전역 상태관리에서 가져와야함
  const currentCategory = '디지털기기'; // 예시로 현재 카테고리를 디지털기기로 설정

  return (
    <>
      <TopBar title='카테고리'></TopBar>
      <Grid container sx={{ marginTop: '20px' }}>
        {Object.values(categoryList).map((name) => (
          <Grid key={name} item xs={4} sx={{ marginTop: '20px' }}>
            <CategortItem
              name={name}
              highlight={name === currentCategory ? true : false}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Category;
