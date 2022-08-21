import { useRef } from 'react';

const useStack = () => {
  const stackRef = useRef<string[]>([]);

  const get = () => {
    const stack = stackRef.current;

    return stack[stack.length - 1];
  };

  const pop = () => {
    const stack = stackRef.current;
    if (stack.length === 0) return undefined;

    return stack.pop();
  };

  const push = (value: string) => {
    const stack = stackRef.current;
    if (typeof value !== 'string') return;

    return stack.push(value);
  };

  return { get, pop, push };
};

export default useStack;
