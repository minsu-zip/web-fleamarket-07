import React from 'react';
import styled from '@emotion/styled';
import { COLOR, TEXT_MEDIUM } from '@constants/style';

interface IProps {
  message?: string;
}

const Empty: React.FC<IProps> = ({ message }) => {
  return (
    <ContainerDiv>
      <img src='/empty.png' alt='error' />
      <h3>{message ?? '텅 비어있어요'}</h3>
    </ContainerDiv>
  );
};

const Error: React.FC<IProps> = ({ message }) => {
  return (
    <ContainerDiv>
      <img src='/error.png' alt='error' />
      <h3>{message ?? '오류가 있어요'}</h3>
    </ContainerDiv>
  );
};

const Loading: React.FC<IProps> = ({ message }) => {
  return (
    <ContainerDiv>
      <LoaderDiv>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoaderDiv>
      <h3>{message ?? '정보를 가져오고 있어요'}</h3>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  flex: 0 0 auto;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    width: 70%;
    aspect-ratio: 1/1;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  & > h3 {
    ${TEXT_MEDIUM}
    margin-top: 2rem;

    color: ${COLOR.label};
  }
`;

const LoaderDiv = styled.div`
  width: 5rem;
  height: 5rem;

  display: inline-block;
  position: relative;

  & > div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  & > div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${COLOR.title};
    margin: -4px 0 0 -4px;
  }
  & > div:nth-of-type(1) {
    animation-delay: -0.036s;
  }
  & > div:nth-of-type(1):after {
    top: 63px;
    left: 63px;
  }
  & > div:nth-of-type(2) {
    animation-delay: -0.072s;
  }
  & > div:nth-of-type(2):after {
    top: 68px;
    left: 56px;
  }
  & > div:nth-of-type(3) {
    animation-delay: -0.108s;
  }
  & > div:nth-of-type(3):after {
    top: 71px;
    left: 48px;
  }
  & > div:nth-of-type(4) {
    animation-delay: -0.144s;
  }
  & > div:nth-of-type(4):after {
    top: 72px;
    left: 40px;
  }
  & > div:nth-of-type(5) {
    animation-delay: -0.18s;
  }
  & > div:nth-of-type(5):after {
    top: 71px;
    left: 32px;
  }
  & > div:nth-of-type(6) {
    animation-delay: -0.216s;
  }
  & > div:nth-of-type(6):after {
    top: 68px;
    left: 24px;
  }
  & > div:nth-of-type(7) {
    animation-delay: -0.252s;
  }
  & > div:nth-of-type(7):after {
    top: 63px;
    left: 17px;
  }
  & > div:nth-of-type(8) {
    animation-delay: -0.288s;
  }
  & > div:nth-of-type(8):after {
    top: 56px;
    left: 12px;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Guide = { Empty, Error, Loading };
export default Guide;
