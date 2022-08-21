import TopBar from '@components/molecules/TopBar';
import CategortItem from '@components/organisms/CategoryItem';
import { Grid } from '@mui/material';
import React from 'react';

const categoryList = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '게임/취미',
  '생활/가공식품',
  '스포츠/레저',
  '여성패션/잡화',
  '남성패션/잡화',
  '유아동',
  '뷰티/미용',
  '반려동물',
  '도서/티켓/음반',
];

const Category: React.FC = () => {
  // 카테고리 탭에 온 상황에 현재 어느 카테고리인지 받아오는 props나 전역 상태관리에서 가져와야함
  const currentCategory = '디지털기기'; // 예시로 현재 카테고리를 디지털기기로 설정

  return (
    <>
      <TopBar title='카테고리'></TopBar>
      <Grid container sx={{ marginTop: '20px' }}>
        {categoryList.map((name) => (
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
