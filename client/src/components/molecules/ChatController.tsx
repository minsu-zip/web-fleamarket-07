import styled from '@emotion/styled';
import React from 'react';

const ChatController: React.FC = () => {
  return (
    <ContainerDiv>
      <div className='wrapper'>ChatController</div>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  width: 100%;
  flex: 0 0 auto;
  padding: 0.3rem;

  position: relative;

  & > .wrapper {
    width: 100%;
    height: 3rem;
    left: 0;
    bottom: 0;
    position: absolute;
    background-color: white;
    opacity: 0.3;
  }
`;

export default ChatController;
