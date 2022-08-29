import { keyframes } from '@emotion/css';

export enum EAnimate {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const SLIDE_STATE = Object.freeze({
  UP: 'UP' as EAnimate.UP,
  DOWN: 'DOWN' as EAnimate.DOWN,
  LEFT: 'LEFT' as EAnimate.LEFT,
  RIGHT: 'RIGHT' as EAnimate.RIGHT,
});

const ANIMATION_TIME = '0.45s';

const slideVertical = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const slideHorizontal = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const getOppositeAnimation = (animate?: EAnimate) => {
  switch (animate) {
    case SLIDE_STATE.UP:
      return SLIDE_STATE.DOWN;
    case SLIDE_STATE.DOWN:
      return SLIDE_STATE.UP;
    case SLIDE_STATE.RIGHT:
      return SLIDE_STATE.LEFT;
    case SLIDE_STATE.LEFT:
      return SLIDE_STATE.RIGHT;
    default:
      return undefined;
  }
};

export const getIsReverse = (animate?: EAnimate) => {
  switch (animate) {
    case SLIDE_STATE.DOWN:
    case SLIDE_STATE.RIGHT:
      return true;
    case SLIDE_STATE.UP:
    case SLIDE_STATE.LEFT:
      return false;
    default:
      return false;
  }
};

export const getAnimationCSS = (animate?: EAnimate) => {
  switch (animate) {
    case SLIDE_STATE.UP:
      return `
        animation: ${slideVertical} ease-in-out ${ANIMATION_TIME} forwards;
      `;
    case SLIDE_STATE.DOWN:
      return `
        animation: ${slideVertical} reverse ease-in-out ${ANIMATION_TIME}
          forwards;
      `;
    case SLIDE_STATE.LEFT:
      return `
        display: flex;
        animation: ${slideHorizontal} ease-in-out ${ANIMATION_TIME} forwards;
      `;
    case SLIDE_STATE.RIGHT:
      return `
        display: flex;
        animation: ${slideHorizontal} reverse ease-in-out ${ANIMATION_TIME}
          forwards;
      `;
    default:
      return ``;
  }
};

export const isRoutesAnimation = (animate?: string) => {
  switch (animate) {
    case slideVertical:
    case slideHorizontal:
      return true;
    default:
      return false;
  }
};
