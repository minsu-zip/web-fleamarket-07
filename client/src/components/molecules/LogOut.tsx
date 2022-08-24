import TopBar from './TopBar';
import { TUserGithub } from '@fleamarket/common';
import { Avatar, Badge, Button } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '@stores/AuthRecoil';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '@apis/user';

interface IProps {
  auth: TUserGithub;
}
const LogOut: React.FC<IProps> = ({ auth }) => {
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await logoutAPI();
    setAuth(null);
    navigate('/');
  }, [navigate, setAuth]);

  return (
    <>
      <TopBar title='내 계정' />
      <ContainerDiv>
        <StyledBadge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
        >
          <Avatar
            sx={{ width: '120px', height: '120px' }}
            alt='Remy Sharp'
            src={auth.avatar}
          />
        </StyledBadge>

        <div>
          <AuthNameSpan>{auth.name}</AuthNameSpan>
        </div>
        <div style={{ width: '50%', marginTop: '20px' }}>
          <Button
            variant='contained'
            sx={{ width: '100%' }}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </ContainerDiv>
    </>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const AuthNameSpan = styled.span`
  font-size: 30px;
`;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: '0 0 0 2px white',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default LogOut;
