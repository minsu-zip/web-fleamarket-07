import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import useAnimator from '@hooks/useAnimator';
import { EAnimate, getAnimationCSS, getIsReverse } from '@constants/slideStyle';

const Animator = ({ children }: PropsWithChildren) => {
  const { controller, endAnimation } = useAnimator({ children });
  const { prev, cur, isAnimating, animationType } = controller;

  const isReverse = getIsReverse(animationType);

  return (
    <SliderDiv
      key={cur.location?.pathname}
      animate={animationType}
      onAnimationEnd={endAnimation}
    >
      {isAnimating && !isReverse ? (
        <WrapperDiv key={prev?.location?.key}>{prev.element}</WrapperDiv>
      ) : (
        <div></div>
      )}
      <WrapperDiv key={cur?.location?.key}>{cur.element}</WrapperDiv>
      {isAnimating && isReverse ? (
        <WrapperDiv key={prev?.location?.key}>{prev.element}</WrapperDiv>
      ) : (
        <div></div>
      )}
    </SliderDiv>
  );
};

const SliderDiv = styled.div<{ animate?: EAnimate }>`
  width: 100%;
  height: 100%;

  ${({ animate }) => getAnimationCSS(animate)}
`;

const WrapperDiv = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
`;

export default Animator;
