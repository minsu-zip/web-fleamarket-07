import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';
import useAnimator from '@hooks/useAnimator';

const Animator = ({ children }: PropsWithChildren) => {
  const { controller, endAnimation } = useAnimator({ children });
  const { prev, cur, isAnimating } = controller;

  if (isAnimating) {
    return (
      <SliderDiv onAnimationEnd={endAnimation}>
        <WrapperDiv>{prev.element}</WrapperDiv>
        <WrapperDiv>{cur.element}</WrapperDiv>;
      </SliderDiv>
    );
  } else {
    return <WrapperDiv>{cur.element}</WrapperDiv>;
  }
};

const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100%));
  }
`;

const SliderDiv = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  animation: ${slideAnimation} ease-in-out 0.25s forwards;
  pointer-events: none;
`;

const WrapperDiv = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
`;

export default Animator;
