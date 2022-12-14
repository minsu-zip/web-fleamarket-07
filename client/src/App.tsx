import React, { useLayoutEffect } from 'react';
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
import Chat from '@pages/Chat';
import Socket from './sockets';
import { getUserLocationAPI } from '@apis/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import { locationAtom } from '@stores/ActionInfoRecoil';
import { useQuery } from 'react-query';
import { TLocation } from '@fleamarket/common';
import Guide from '@components/atoms/Guide';

const App: React.FC = () => {
  useLayoutEffect(() => {
    Socket.connect();

    return () => {
      Socket.disconnect();
    };
  }, []);

  const Auth = useRecoilValue(authAtom);
  const setLocation = useSetRecoilState(locationAtom);

  const { isLoading, isError } = useQuery<TLocation[]>(
    'getLocation',
    () => getUserLocationAPI(Auth?.id),
    {
      onSuccess: (data: TLocation[]) =>
        data.length ? setLocation(data) : null,
    },
  );

  if (isError) return <Guide.Error />;

  if (isLoading) return <Guide.Loading />;

  return (
    <Animator>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Main />} />
        <Route path='/category' element={<Category />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='' element={<Verification />}>
          <Route path='/chat/:productId' element={<Chat />} />
          <Route path='/locationEdit' element={<LocationEdit />} />
          <Route path='/newProduct' element={<NewProduct />} />
          <Route path='/menu' element={<Menu />} />
        </Route>
      </Routes>
    </Animator>
  );
};

export default App;
