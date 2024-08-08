import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

const useDidUpdateEffect = (effect: () => void, deps: DependencyList) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
  }, deps);
};

export default useDidUpdateEffect;
