import React, { useEffect } from 'react';
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
import { getUserLocationAPI } from '@apis/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import { locationAtom } from '@stores/ActionInfoRecoil';

const App: React.FC = () => {
  const Auth = useRecoilValue(authAtom);
  const setLocation = useSetRecoilState(locationAtom);

  useEffect(() => {
    (async () => {
      if (Auth?.id) {
        const locationList = await getUserLocationAPI(Auth.id);
        const { location1Id, location1Name, location2Id, location2Name } =
          locationList[0];
        const newLocation = [
          { id: location1Id, region: location1Name },
          { id: location2Id, region: location2Name },
        ];

        setLocation(newLocation.filter(({ id, region }) => id && region));
      }
    })();
  }, [Auth?.id, setLocation]);

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
          <Route path='/locationEdit' element={<LocationEdit />} />
          <Route path='/newProduct' element={<NewProduct />} />
          <Route path='/menu' element={<Menu />} />
        </Route>
      </Routes>
    </Animator>
  );
};

export default App;
