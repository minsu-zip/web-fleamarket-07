import React from 'react';
import styled from '@emotion/styled';
import { TEXT_LINK_MEDIUM, COLOR } from '@constants/style';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Avatar, IconButton } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const MenuHeader: React.FC = () => {
  // 전역상태관리 및 유저 정보에서 현재 위치, 프로필 이미지 가져온다
  const currentLocation = '역삼동';
  const userProfile = '';
  const navigate = useNavigate();

  return (
    <ContainerDiv>
      <div>
        <IconButtonWrapper size='large' onClick={() => navigate('category')}>
          <AutoAwesomeMosaicOutlinedIcon />
        </IconButtonWrapper>
      </div>

      <div>
        <IconButtonWrapper
          size='large'
          onClick={() => navigate('locationEdit')}
        >
          <FmdGoodOutlinedIcon />
        </IconButtonWrapper>
        <span
          className={css`
            ${TEXT_LINK_MEDIUM}
          `}
        >
          {currentLocation}
        </span>
      </div>

      <UserWrapperDiv>
        <Avatar
          alt='userProfile'
          src={userProfile}
          sx={{ width: 30, height: 30 }}
        />
        <IconButtonWrapper size='large' onClick={() => navigate('menu')}>
          <MenuOutlinedIcon />
        </IconButtonWrapper>
      </UserWrapperDiv>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  background-color: ${COLOR.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  border-radius: 0px 0px 16px 16px;
`;

const UserWrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconButtonWrapper = styled(IconButton)({
  color: 'black',
});
export default MenuHeader;
