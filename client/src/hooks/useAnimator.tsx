import { EAnimate } from '@constants/slideStyle';
import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Location, useLocation } from 'react-router-dom';

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

const cloneChildren = (children: ReactNode, location: Location) => {
  if (!isValidElement(children)) return <>{children}</>;

  return cloneElement(children, { location });
};

const initialRouteInfo = Object.freeze({
  location: undefined,
  element: undefined,
});

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

  useEffect(() => {
    if (location === controller.cur.location) return;

    const animationType = (location.state as { animate: EAnimate })?.animate;
    const isAnimating = !!animationType;

    setController((prevState) => ({
      prev: isAnimating ? prevState.cur : initialRouteInfo,
      cur: {
        location,
        element: cloneChildren(children, location),
      },
      animationType,
      isAnimating,
    }));
  }, [location, controller, setController, children]);

  const endAnimation = () => {
    setController((prevState) => ({
      ...prevState,
      prev: initialRouteInfo,
      animationType: undefined,
      isAnimating: false,
    }));
  };

  return { controller, endAnimation };
};

export default useAnimator;
