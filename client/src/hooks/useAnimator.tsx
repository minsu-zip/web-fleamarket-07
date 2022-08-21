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
  isAnimating: boolean;
}

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
    isAnimating: false,
  });

  useEffect(() => {
    setController((prevState) => ({
      prev: prevState.cur,
      cur: {
        location,
        element: cloneChildren(children, location),
      },
      isAnimating: true,
    }));
  }, [location]);

  const endAnimation = () => {
    setController((prevState) => ({
      ...prevState,
      isAnimating: false,
    }));
  };

  return { controller, endAnimation };
};

export default useAnimator;
