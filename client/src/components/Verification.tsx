import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';

export default function Unauthorized() {
  const Auth = useRecoilValue(authAtom);
  if (Auth) return <Outlet />;

  return <Navigate to='/signIn' />;
}
