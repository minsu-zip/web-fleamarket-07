import TopBar from '@components/molecules/TopBar';
import CategortItem from '@components/organisms/CategoryItem';
import { categoryList } from '@constants/categoryList';
import { Grid } from '@mui/material';
import React from 'react';

const Category: React.FC = () => {
  return (
    <>
      <TopBar title='카테고리'></TopBar>
      <Grid container sx={{ marginTop: '20px' }}>
        {Object.entries(categoryList).map(([key, value]) => (
          <Grid key={value} item xs={4} sx={{ marginTop: '20px' }}>
            <CategortItem name={value} id={+key} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default Category;
