import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Main,
  Category,
  LocationEdit,
  NewProduct,
  ProductDetail,
  SignUp,
  SignIn,
  NotFound,
} from '@src/pages';
import Animator from '@components/Animator';

const App: React.FC = () => {
  return (
    <Animator>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Main />} />
        <Route path='/category' element={<Category />} />
        <Route path='/locationEdit' element={<LocationEdit />} />
        <Route path='/newProduct' element={<NewProduct />} />
        <Route path='/productDetail' element={<ProductDetail />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/signIn' element={<SignIn />} />
      </Routes>
    </Animator>
  );
};

export default App;
