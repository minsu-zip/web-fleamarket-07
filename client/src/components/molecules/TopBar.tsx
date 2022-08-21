import React from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TEXT_MEDIUM, COLOR } from '@constants/style';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
  children?: React.ReactNode;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

const TopBar: React.FC<IProps> = ({ title, children, onClick }) => {
  const navigate = useNavigate();

  return (
    <ContainerDiv>
      <IconWrapperDiv onClick={() => navigate(-1)}>
        <IconButton size='large' sx={{ color: 'black' }}>
          <ArrowBackIosIcon />
        </IconButton>
      </IconWrapperDiv>
      <div>
        <span
          className={css`
            ${TEXT_MEDIUM}
          `}
        >
          {title}
        </span>
      </div>
      <IconWrapperDiv onClick={onClick}>
        <IconButton size='large' sx={{ color: 'black' }}>
          {children}
        </IconButton>
      </IconWrapperDiv>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  background-color: ${COLOR.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconWrapperDiv = styled.div`
  min-width: 50px;
`;

export default TopBar;
