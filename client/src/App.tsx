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
  Menu,
} from '@src/pages';
import Animator from '@components/Animator';
import Verification from '@components/Verification';

const App: React.FC = () => {
  return (
    <Animator>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Main />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/category' element={<Category />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='' element={<Verification />}>
          <Route path='/locationEdit' element={<LocationEdit />} />
          <Route path='/newProduct' element={<NewProduct />} />
        </Route>
      </Routes>
    </Animator>
  );
};

export default App;
