import { authAtom } from '@stores/AuthRecoil';
import { getCookie } from '@utils/cookie';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import jwt_decode from 'jwt-decode';
import type { TUserGithub } from '@fleamarket/common';

const useAuth = () => {
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    const authToken = getCookie('auth');
    if (authToken) {
      const decoded: TUserGithub = jwt_decode(authToken);
      setAuth(decoded);
    } else {
      setAuth(null);
    }
  }, [setAuth]);
};

export default useAuth;
