import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import useAnimator from '@hooks/useAnimator';
import { EAnimate, getAnimationCSS, getIsReverse } from '@constants/slideStyle';

const Animator = ({ children }: PropsWithChildren) => {
  const { controller, endAnimation } = useAnimator({ children });
  const { prev, cur, isAnimating, animationType } = controller;

  if (isAnimating) {
    const isReverse = getIsReverse(animationType);

    return (
      <SliderDiv
        key={cur.location?.pathname}
        animate={animationType}
        onAnimationEnd={endAnimation}
      >
        {!isReverse && <WrapperDiv>{prev.element}</WrapperDiv>}
        <WrapperDiv>{cur.element}</WrapperDiv>
        {isReverse && <WrapperDiv>{prev.element}</WrapperDiv>}
      </SliderDiv>
    );
  }

  return <WrapperDiv>{cur.element}</WrapperDiv>;
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