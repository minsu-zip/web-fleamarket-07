import { EAnimate, getOppositeAnimation } from '@constants/slideStyle';
import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Location, useLocation } from 'react-router-dom';
import useStack from './useStack';

type TRouteInfo = {
  location?: Location;
  element?: JSX.Element;
};
interface IController {
  prev: TRouteInfo;
  cur: TRouteInfo;
  animationType?: EAnimate;
  isAnimating: boolean;
}

// ReactNode 중에서 JSX.Element 요소만을 사용시켜주기 위함
const cloneChildren = (children: ReactNode, location: Location) => {
  if (!isValidElement(children)) return <>{children}</>;

  return cloneElement(children, { location });
};

const useAnimator = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [controller, setController] = useState<IController>({
    prev: {
      location: undefined,
      element: undefined,
    },
    cur: {
      location,
      element: cloneChildren(children, location),
    },
    animationType: undefined,
    isAnimating: false,
  });

  const historyStack = useStack();
  useEffect(() => {
    const { cur } = controller;
    // location이 변경될 때에만 Animating State 변경
    if (location.key === cur.location?.key) return;

    // 어떤 애니메이션을 사용할지 결정해야 한다.
    // 기본적으로 개발자가 pushState 했다고 생각했을 때, state 값을 가져온다.
    let animationType = (location.state as { animate: EAnimate | undefined })
      ?.animate;

    // 하지만 popState 를 했을 경우는 이전 값의 state를 반대로 애니메이팅 해야한다.
    if (cur.location && location.key === historyStack.get()) {
      historyStack.pop();
      animationType = getOppositeAnimation(
        (cur.location.state as { animate: EAnimate | undefined })?.animate,
      );
    }
    // pushState 시 stack에 key 값을 저장한다
    else if (cur.location) {
      historyStack.push(cur.location.key);
    }

    // animationType 이 undefined 일 때에는 아예 발동시키지 않는다.
    const isAnimating = !!animationType;

    // Controller의 State를 결정한다
    setController((prevState) => ({
      prev: prevState.cur,
      cur: {
        location,
        element: cloneChildren(children, location),
      },
      animationType,
      isAnimating,
    }));
  }, [location, controller, setController, children, historyStack]);

  // 애니메이션이 끝났으면, 끝났다는 것을 state로 명시적으로 알려주어야 한다
  const endAnimation = () => {
    setController((prevState) => ({
      ...prevState,
      animationType: undefined,
      isAnimating: false,
    }));
  };

  return { controller, endAnimation };
};

export default useAnimator;
