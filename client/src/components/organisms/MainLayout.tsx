import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuHeader from './MenuHeader';
import { COLOR } from '@constants/style';

interface IProps extends React.PropsWithChildren {
  backgroundColor?: string;
}

interface IComposition {
  FAB: React.FC;
}

const MainLayout: React.FC<IProps> & IComposition = ({
  children,
  backgroundColor,
}) => {
  return (
    <ContainerDiv backgroundColor={backgroundColor}>
      <MenuHeader />
      {children}
    </ContainerDiv>
  );
};

const FAB: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FabWrapper color='primary' onClick={() => navigate('newProduct')}>
      <AddIcon />
    </FabWrapper>
  );
};

const ContainerDiv = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  overflow: none;

  ${({ backgroundColor }) =>
    backgroundColor ? `background-color: ${backgroundColor};` : ''}

  &:hover > #item::-webkit-scrollbar-thumb {
    background-color: ${COLOR.title};
  }
`;

const FabWrapper = styled(Fab)({
  position: 'absolute',
  right: '1rem',
  bottom: '1rem',
});

MainLayout.FAB = FAB;
export default MainLayout;
