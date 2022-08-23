import TopBar from '@components/molecules/TopBar';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';

import { COLOR } from '@constants/style';
import { GITHUB_ID } from '@constants/envs';
import LogOut from '@components/molecules/LogOut';

const SignIn: React.FC = () => {
  const Auth = useRecoilValue(authAtom);

  if (Auth?.id) {
    return <LogOut auth={Auth} />;
  }

  return (
    <>
      <TopBar title='로그인' />
      <div style={{ marginTop: '40px' }}>
        <Img src={'baemin.png'} />

        <SocialButton variant='contained'>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}`}
          >
            <GithubWrapperDiv>
              <div>
                <img className='github' src={'github.svg'} alt='githubIcon' />
              </div>
              <div style={{ paddingLeft: '20px' }}>
                <span>깃허브로 계속하기</span>
              </div>
            </GithubWrapperDiv>
          </a>
        </SocialButton>
      </div>
    </>
  );
};

const Img = styled.img`
  display: block;
  margin: 0px auto;
  width: 80%;
`;

const GithubWrapperDiv = styled.div`
  display: flex;
  /* justify-content: space-between; */
  padding-top: 4px;
  align-items: center;
`;
const SocialButton = styled(Button)({
  display: 'flex',
  margin: '0px auto',
  marginTop: '20px',
  color: COLOR.offWhite,
  width: '80%',
  height: '48px',
  borderRadius: '6px',
  backgroundColor: '#000000',
  '&:active': {
    backgroundColor: '#000000',
  },
  '&:hover': {
    backgroundColor: '#000000',
  },
});

export default SignIn;
