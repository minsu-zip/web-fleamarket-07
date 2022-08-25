import React from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TEXT_MEDIUM, COLOR } from '@constants/style';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title?: string;
  children?: React.ReactNode;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
  background?: string;
}

const TopBar: React.FC<IProps> = ({
  title = '',
  children,
  onClick,
  background,
}) => {
  const navigate = useNavigate();

  return (
    <ContainerDiv background={background}>
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
        {children && (
          <IconButton size='large' sx={{ color: 'black' }}>
            {children}
          </IconButton>
        )}
      </IconWrapperDiv>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div<{ background?: string }>`
  flex: 0 0 auto;
  width: 100%;
  height: 56px;
  padding: 0 0.75rem;

  background: ${({ background }) => background ?? COLOR.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconWrapperDiv = styled.div`
  min-width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TopBar;
